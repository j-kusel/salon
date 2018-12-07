export default function parseTags(content) {
    var hashtagger = /\B#(\w)\w+/g;
    var results = [];
    var m = hashtagger.exec(content);
    while (m) {
        results.push(m[0].substring(1));
        m = hashtagger.exec(content);
    }
    return results;
}
