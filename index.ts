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

/**
 * Копирует перечислимые свойства одного или нескольких объектов в целевой объект.
 *
 * @param {Boolean} [deep=false] При значении `true` свойства копируются рекурсивно.
 * @param {Object} target Объект для расширения. Он получит новые свойства.
 * @param {...Object} objects Объекты со свойствами для копирования. Аргументы со значениями
 *      `null` или `undefined` игнорируются.
 * @returns {Object}
 */
const extend = function extend(...args: any[]): object {
    let target: boolean | object = args[0];
    let deep: boolean;
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
        const obj: object = args[i];
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
                    console.log(deep, clone, val);
                    target[key] = extend(deep, clone, val);
                } else {
                    target[key] = val;
                }
            }
        }
    }

    return target;
};

let obj1 = {
    obj1_1: 123,
    obj1_2: 321,
    obj1_3: () => {
        return this.obj1_1 + 'hui';
    }
};

let obj2 = {
    obj2_1: 'foo',
    obj2_2: 111,
    obj2_3: {
        aa: 'aa',
        bb: 'bb'
    }
};

let obj3 = {
    obj3_1: 'foo',
    obj3_2: 111,
    obj3_3: {
        aa: 'aa',
        bb: 'bb'
    }
};



let arr1 = [
    true,
    {},
    obj1,
    obj2,
    obj3
];


console.log('--true--');
let res = extend(...arr1);
console.log(res);




/*
console.log('--obj--');
console.log(extend(...arr2));*/
