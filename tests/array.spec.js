var expect = require("chai").expect;
describe("Array", () => {
  describe("#sort", () => {
    it("should sorting array by name", () => {
      var names = ["Bar", "Lihi", "Noa", "Eilon"];
      expect(names.sort()).to.be.eql(["Bar", "Eilon", "Lihi", "Noa"]);
    });
  });
});
