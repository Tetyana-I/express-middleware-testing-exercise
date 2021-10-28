const items = require('../fakeDb');

function isDuplicate(itemName) {
    const names = items.map(item => item.name);
    let isDuplicate = names.find(name => name === itemName);
    return isDuplicate !== undefined;
}

module.exports = isDuplicate;


