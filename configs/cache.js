import NodeCache from 'node-cache';
const cache = new NodeCache({stdTTL: 30});

export default cache;