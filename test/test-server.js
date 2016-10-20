describe('Shopping List', () => {
  it('should list items on get');
  it('should add an item on post');
  it('should edit an item on put');
  it('should delete an item on delete');
  it('should return error on post of existing item');
  it('should return error on post with empty body');
  it('should return error on post with non-json body');
  it('should return error on put without id on endpoint');
  it('should return error on put with different id in endpoint than body');
  it('should return error on put to id that does not exist');
  it('should return error on put without body data');
  it('should return error on put with non-json body');
  it('should return error on delete on item that does not exist');
  it('should return error on delete without id in endpoint');
});
