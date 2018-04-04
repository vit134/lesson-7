const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringg = Object.prototype.toString;

/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
function isPlainObject(obj: object) {
    if (toStringg.call(obj) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(obj);
    return prototype === null ||
        prototype === Object.prototype;
}

/**
 * Копирует перечислимые свойства одного или нескольких объектов в целевой объект.
 *
 * @param {Boolean} [deep=false] При значении `true` свойства копируются рекурсивно.
 * @param {Object} target Объект для расширения. Он получит новые свойства.
 * @param {...Object} objects Объекты со свойствами для копирования. Аргументы со значениями
 *      `null` или `undefined` игнорируются.
 * @returns {Object}
 */
const extend = function extend(...args: any[]):object {
    let target = args[0];
    let deep;
    let i;

    // Обрабатываем ситуацию глубокого копирования.
    if (typeof target === 'boolean') {
        deep = target;
        target = args[1];
        i = 2;
    } else {
        deep = false;
        i = 1;
    }

    for (; i < arguments.length; i++) {
        const obj = args[i];
        if (!obj) {
            continue;
        }

        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                const isArray = val && Array.isArray(val);

                // Копируем "плоские" объекты и массивы рекурсивно.
                if (deep && val && (isPlainObject(val) || isArray)) {
                    const src = target[key];
                    let clone;
                    if (isArray) {
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[key] = extend(deep, clone, val);
                } else {
                    target[key] = val;
                }
            }
        }
    }

    return target;
};


let res = extend(true, {}, {asd: 'asd', bsd: {asdasd: 'asdasd', bla: null}}, {aaa: 'aaa', bbb: 123});

console.log(res);