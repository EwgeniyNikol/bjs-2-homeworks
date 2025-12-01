//Задача № 1
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  
  function wrapper(...args) {
    wrapper.allCount = (wrapper.allCount || 0) + 1;
    
    if (wrapper.allCount === 1) {
      func.apply(this, args);
      wrapper.count = (wrapper.count || 0) + 1;
    }
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      wrapper.count = (wrapper.count || 0) + 1;
    }, delay);
  }
  
  wrapper.count = 0;
  wrapper.allCount = 0;
  
  return wrapper;
}

module.exports = {
  debounceDecoratorNew,
};

//Задача № 2
// const md5 = require('./js-md5.js');

function cachingDecoratorNew(func) {
  let cache = new Map(); // Используем Map вместо массива для эффективности
  const maxCacheValuesCount = 5;
  
  return function(...args) {
    // Более безопасное создание хеша
    let hash;
    try {
      // Используем более надежный способ сериализации
      const serializedArgs = args.map(arg => {
        if (typeof arg === 'function') {
          return arg.toString(); // Для функций используем строковое представление
        }
        if (arg === undefined) {
          return 'undefined'; // Явно обрабатываем undefined
        }
        return JSON.stringify(arg);
      }).join('|');
      
      hash = md5(serializedArgs);
    } catch (error) {
      // Если не удалось создать хеш, считаем это уникальным вызовом
      console.error('Ошибка при создании хеша:', error);
      hash = md5(Date.now() + Math.random().toString());
    }
    
    // Проверяем кеш
    if (cache.has(hash)) {
      const cachedValue = cache.get(hash);
      console.log(`Из кеша: ${cachedValue}`);
      return `Из кеша: ${cachedValue}`;
    }
    
    // Вычисляем значение
    let result;
    try {
      result = func.apply(this, args);
    } catch (error) {
      console.error('Ошибка при вычислении функции:', error);
      throw error; // Пробрасываем ошибку дальше
    }
    
    // Обновляем кеш (LRU логика)
    cache.set(hash, result);
    
    // Если превышен лимит, удаляем самый старый элемент
    if (cache.size > maxCacheValuesCount) {
      // У Map нет встроенной LRU логики, удаляем первый элемент
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    console.log(`Вычисляем: ${result}`);
    return `Вычисляем: ${result}`;
  };
}

module.exports = {
  cachingDecoratorNew
};

