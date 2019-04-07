# Installation
```sh
npm install fln-cache
```

# Usage
```javascript
import fln_cache from 'fln-cache'

let cache1 = fln_cache('mycache1')
let cache2 = fln_cache('mycache2')

cache1.set('id1', 'data cached', 10) // 10 seconds of cache, default is 1 sec
cache1.set('id2', {a:1, b:2})
cache2.set('id1', {x:10})
cache2.set('id2', [1,2,3])

cache1.get('id2') // returns {a:1, b:2}
cache2.get('id2') // returns [1,2,3]

cache1.clear('id1')
cache2.clearAll()

```
