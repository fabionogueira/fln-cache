// @ts-check

export default function (id) {
    let listId = `__cache__${id}_list`
    let prefixId = `__cache__${id}-`
    let list = getStorage(listId) || {}
    
    // exclui todo o cache expirado
    Object.keys(list).forEach(key => {
        let cache = getStorage(key)

        if (cache && isExpired(cache)){
            deleteCache(list, listId, key)
        }
    })

    return {
        get(cacheId){
            let cache
            
            cacheId = `${prefixId}${cacheId}`
            cache = getStorage(cacheId)

            if (cache){
                if (isExpired(cache)){
                    return deleteCache(list, listId, cacheId)
                } 

                return cache.data
            }

            return null
        },

        /**
         * @param {String} cacheId identificador
         * @param {Object} data dados do cache
         * @param {Number?} time tempo de expiração em minutos 
         */
        set(cacheId, data, time = 1){
            let cache = {
                timestamp: (new Date()).getTime(),
                time: time * 60000,
                data
            }

            cacheId = `${prefixId}${cacheId}`
            localStorage.setItem(cacheId, JSON.stringify(cache))
            
            list[cacheId] = 1
            setStorage(listId, list)
            
            return cache
        },

        clear(cacheId){
            deleteCache(list, listId, `${prefixId}${cacheId}`)
        },

        clearAll(){
            Object.keys(list).forEach(key => {        
                deleteCache(list, listId, key)
            })
            deleteCache(list, listId, listId)
        }
    }
}

function isExpired(cache){
    let timestamp = (new Date()).getTime()
    return (timestamp - cache.timestamp) > cache.time
}

function deleteCache(list, listId, cacheId){
    delete(list[cacheId])

    localStorage.removeItem(cacheId)
    setStorage(listId, list)
}

function getStorage(storageId){
    return JSON.parse(localStorage.getItem(storageId))
}

function setStorage(storageId, data){
    localStorage.setItem(storageId, JSON.stringify(data))
}
