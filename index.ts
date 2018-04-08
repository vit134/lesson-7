const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;

/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
function isPlainObject(obj: object): boolean {
    if (toString.call(obj) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(obj);
    return prototype === null ||
        prototype === Object.prototype;
}

interface Iobject extends Object{
    [key: string]: any;
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
const extend = function extend(recursive: boolean | Iobject, ...args: object[]) {
    let target: Iobject;
    let deep: boolean;
    let i;

    // Обрабатываем ситуацию глубокого копирования.
    if (typeof recursive === 'boolean') {
        deep = recursive;
        target = args[0];
        i = 1;
    } else {
        deep = false;
        target = recursive;
        i = 0;
    }

    for (; i < arguments.length; i++) {
        const obj: Iobject = args[i];
        if (!obj) {
            continue;
        }

        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                const val: any = obj[key];
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

let res = extend(true, {}, {aaa: 'aaa', bbb: 'bbb', asd: {dsa: 'dsa', qwe: 'ewq'}}, {ccc: null, undefined: 111, dfg: ['123', 321]}, {eee: 'eee', ddd: 'ddd'});



console.log(res);