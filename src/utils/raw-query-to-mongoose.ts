const rawQueryToMongoose = (rawQuery: any = {}) => {
  if ('where' in rawQuery) {
    const regex =
      /\b(eq|gt|gte|in|lt|lte|ne|nin|and|not|nor|or|exists|type|expr|regex|)\b/g;
    const { where } = rawQuery;
    const whereQueryStr = JSON.stringify(where).replace(regex, '$$' + '$1');
    rawQuery.where = JSON.parse(whereQueryStr);
  }
  return rawQuery;
};

export default rawQueryToMongoose;
