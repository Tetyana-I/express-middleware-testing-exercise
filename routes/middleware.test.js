const items = require('../fakeDb');
const isDuplicate = require('./middleware');

const popsicle = { name: "popsicle", price: 1.45};

beforeEach(function() {
    items.push(popsicle);
});
afterEach(function() {
    items.length = 0;
});

describe("isDuplicate function testing", function () {
    test("checks that name is not in the list and return False", function() {
       let name = "milk";
       expect(isDuplicate(name)).toBeFalsy();
    }); 
    test("checks that name is already in the list", function() {
        let name = "popsicle";
        expect(isDuplicate(name)).toBeTruthy();
     });
}); 