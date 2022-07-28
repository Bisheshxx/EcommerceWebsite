class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr }; //everything that is in the query copied
    const removeFields = ["keyword", "page", "limit"]; // key values of the query

    removeFields.forEach((key) => delete queryCopy[key]); //removing the unwanted fields
    //filter for price and rating
    let queryStr = JSON.stringify(queryCopy); //stringing the value of the queryStr object to place the gt with $gt in the next code
    queryStr = queryStr.replace(/\b(ge|gte|lt|lte)\b/g, (key) => `$${key}`); //replaces the gt with $gt

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultPerPage * (currentPage - 1); //for skipping products

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
