/* **********************************************
     Begin prism-core.js
********************************************** */

const self =
  typeof window !== 'undefined'
    ? window // if in browser
    : typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
    ? self // if in worker
    : {}; // if in node js

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

let Prism = (function () {
  // Private helper vars
  let lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

  var _ = (self.Prism = {
    util: {
      encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(
            tokens.type,
            _.util.encode(tokens.content),
            tokens.alias
          );
        } else if (_.util.type(tokens) === 'Array') {
          return tokens.map(_.util.encode);
        } else {
          return tokens
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/\u00a0/g, ' ');
        }
      },

      type(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },

      // Deep clone a language definition (e.g. to extend it)
      clone(o) {
        let type = _.util.type(o);

        switch (type) {
          case 'Object':
            var clone = {};

            for (let key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key]);
              }
            }

            return clone;

          case 'Array':
            return o.slice();
        }

        return o;
      },
    },

    languages: {
      extend(id, redef) {
        let lang = _.util.clone(_.languages[id]);

        for (let key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore(inside, before, insert, root) {
        root = root || _.languages;
        let grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        let ret = {};

        for (let token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        }

        // Update references in other language definitions
        _.languages.DFS(_.languages, function (key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return (root[inside] = ret);
      },

      // Traverse a language definition with Depth First Search
      DFS(o, callback, type) {
        for (let i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === 'Object') {
              _.languages.DFS(o[i], callback);
            } else if (_.util.type(o[i]) === 'Array') {
              _.languages.DFS(o[i], callback, i);
            }
          }
        }
      },
    },

    highlightAll(async, callback) {
      let elements = document.querySelectorAll(
        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      );

      for (var i = 0, element; (element = elements[i++]); ) {
        _.highlightElement(element, async === true, callback);
      }
    },

    highlightElement(element, async, callback) {
      // Find language
      let language,
        grammar,
        parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ''])[1];
        grammar = _.languages[language];
      }

      if (!grammar) {
        return;
      }

      // Set language on the element, if not present
      element.className =
        element.className.replace(lang, '').replace(/\s+/g, ' ') +
        ' language-' +
        language;

      // Set language on the parent, for styling
      parent = element.parentNode;

      if (/pre/i.test(parent.nodeName)) {
        parent.className =
          parent.className.replace(lang, '').replace(/\s+/g, ' ') +
          ' language-' +
          language;
      }

      let code = element.textContent;

      if (!code) {
        return;
      }

      let env = {
        element,
        language,
        grammar,
        code,
      };

      _.hooks.run('before-highlight', env);

      if (async && self.Worker) {
        let worker = new Worker(_.filename);

        worker.onmessage = function (evt) {
          env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

          _.hooks.run('before-insert', env);

          env.element.innerHTML = env.highlightedCode;

          callback && callback.call(env.element);
          _.hooks.run('after-highlight', env);
        };

        worker.postMessage(
          JSON.stringify({
            language: env.language,
            code: env.code,
          })
        );
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(element);

        _.hooks.run('after-highlight', env);
      }
    },

    highlight(text, grammar, language) {
      let tokens = _.tokenize(text, grammar);
      return Token.stringify(_.util.encode(tokens), language);
    },

    tokenize(text, grammar, language) {
      let Token = _.Token;

      let strarr = [text];

      let rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      tokenloop: for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        let patterns = grammar[token];
        patterns = _.util.type(patterns) === 'Array' ? patterns : [patterns];

        for (let j = 0; j < patterns.length; ++j) {
          let pattern = patterns[j],
            inside = pattern.inside,
            lookbehind = !!pattern.lookbehind,
            lookbehindLength = 0,
            alias = pattern.alias;

          pattern = pattern.pattern || pattern;

          for (let i = 0; i < strarr.length; i++) {
            // Don’t cache length as it changes during the loop

            let str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              break tokenloop;
            }

            if (str instanceof Token) {
              continue;
            }

            pattern.lastIndex = 0;

            var match = pattern.exec(str);

            if (match) {
              if (lookbehind) {
                lookbehindLength = match[1].length;
              }

              var from = match.index - 1 + lookbehindLength,
                match = match[0].slice(lookbehindLength),
                len = match.length,
                to = from + len,
                before = str.slice(0, from + 1),
                after = str.slice(to + 1);

              let args = [i, 1];

              if (before) {
                args.push(before);
              }

              let wrapped = new Token(
                token,
                inside ? _.tokenize(match, inside) : match,
                alias
              );

              args.push(wrapped);

              if (after) {
                args.push(after);
              }

              Array.prototype.splice.apply(strarr, args);
            }
          }
        }
      }

      return strarr;
    },

    hooks: {
      all: {},

      add(name, callback) {
        let hooks = _.hooks.all;

        hooks[name] = hooks[name] || [];

        hooks[name].push(callback);
      },

      run(name, env) {
        let callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; (callback = callbacks[i++]); ) {
          callback(env);
        }
      },
    },
  });

  var Token = (_.Token = function (type, content, alias) {
    this.type = type;
    this.content = content;
    this.alias = alias;
  });

  Token.stringify = function (o, language, parent) {
    if (typeof o == 'string') {
      return o;
    }

    if (Object.prototype.toString.call(o) == '[object Array]') {
      return o
        .map(function (element) {
          return Token.stringify(element, language, o);
        })
        .join('');
    }

    let env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language,
      parent,
    };

    if (env.type == 'comment') {
      env.attributes['spellcheck'] = 'true';
    }

    if (o.alias) {
      let aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run('wrap', env);

    let attributes = '';

    for (let name in env.attributes) {
      attributes += name + '="' + (env.attributes[name] || '') + '"';
    }

    return (
      '<' +
      env.tag +
      ' class="' +
      env.classes.join(' ') +
      '" ' +
      attributes +
      '>' +
      env.content +
      '</' +
      env.tag +
      '>'
    );
  };

  if (!self.document) {
    if (!self.addEventListener) {
      // in Node.js
      return self.Prism;
    }
    // In worker
    self.addEventListener(
      'message',
      function (evt) {
        let message = JSON.parse(evt.data),
          lang = message.language,
          code = message.code;

        self.postMessage(
          JSON.stringify(_.util.encode(_.tokenize(code, _.languages[lang])))
        );
        self.close();
      },
      false
    );

    return self.Prism;
  }

  // Get current script and highlight
  let script = document.getElementsByTagName('script');

  script = script[script.length - 1];

  if (script) {
    _.filename = script.src;

    if (document.addEventListener && !script.hasAttribute('data-manual')) {
      document.addEventListener('DOMContentLoaded', _.highlightAll);
    }
  }

  return self.Prism;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Prism;
}

/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/g,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern:
      /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      tag: {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[\w-]+?:/,
        },
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          punctuation: /=|>|"/g,
        },
      },
      punctuation: /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          namespace: /^[\w-]+?:/,
        },
      },
    },
  },
  entity: /\&#?[\da-z]{1,8};/gi,
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});

/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      punctuation: /[;:]/g,
    },
  },
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  property: /(\b|\B)[\w-]+(?=\s*:)/gi,
  string: /("|')(\\?.)*?\1/g,
  important: /\B!important\b/gi,
  punctuation: /[\{\};:]/g,
  function: /[-a-z0-9]+(?=\()/gi,
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    style: {
      pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
      inside: {
        tag: {
          pattern: /<style[\w\W]*?>|<\/style>/gi,
          inside: Prism.languages.markup.tag.inside,
        },
        rest: Prism.languages.css,
      },
      alias: 'language-css',
    },
  });

  Prism.languages.insertBefore(
    'inside',
    'attr-value',
    {
      'style-attr': {
        pattern: /\s*style=("|').+?\1/gi,
        inside: {
          'attr-name': {
            pattern: /^\s*style/gi,
            inside: Prism.languages.markup.tag.inside,
          },
          punctuation: /^\s*=\s*['"]|['"]\s*$/,
          'attr-value': {
            pattern: /.+/gi,
            inside: Prism.languages.css,
          },
        },
        alias: 'language-css',
      },
    },
    Prism.languages.markup.tag
  );
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
      lookbehind: true,
    },
    {
      pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
      lookbehind: true,
    },
  ],
  string: /("|')(\\?.)*?\1/g,
  'class-name': {
    pattern:
      /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/,
    },
  },
  keyword:
    /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  boolean: /\b(true|false)\b/g,
  function: {
    pattern: /[a-z0-9_]+\(/gi,
    inside: {
      punctuation: /\(/,
    },
  },
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g,
};

/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
  keyword:
    /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g,
});

Prism.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern:
      /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true,
  },
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    script: {
      pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
      inside: {
        tag: {
          pattern: /<script[\w\W]*?>|<\/script>/gi,
          inside: Prism.languages.markup.tag.inside,
        },
        rest: Prism.languages.javascript,
      },
      alias: 'language-javascript',
    },
  });
}

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
  if (!self.Prism || !self.document || !document.querySelector) {
    return;
  }

  let Extensions = {
    js: 'javascript',
    html: 'markup',
    svg: 'markup',
    xml: 'markup',
    py: 'python',
    rb: 'ruby',
  };

  Array.prototype.slice
    .call(document.querySelectorAll('pre[data-src]'))
    .forEach(function (pre) {
      let src = pre.getAttribute('data-src');
      let extension = (src.match(/\.(\w+)$/) || [, ''])[1];
      let language = Extensions[extension] || extension;

      let code = document.createElement('code');
      code.className = 'language-' + language;

      pre.textContent = '';

      code.textContent = 'Loading…';

      pre.appendChild(code);

      let xhr = new XMLHttpRequest();

      xhr.open('GET', src, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status < 400 && xhr.responseText) {
            code.textContent = xhr.responseText;

            Prism.highlightElement(code);
          } else if (xhr.status >= 400) {
            code.textContent =
              '✖ Error ' +
              xhr.status +
              ' while fetching file: ' +
              xhr.statusText;
          } else {
            code.textContent = '✖ Error: File does not exist or is empty';
          }
        }
      };

      xhr.send(null);
    });
})();
