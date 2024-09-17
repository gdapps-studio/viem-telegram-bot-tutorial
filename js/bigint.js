// const USI = Number.MAX_SAFE_INTEGER + 1;

// e is scientific notation -> 1.7976931348623157 * 10^108
// Number.MAX_VALUE; //1.7976931348623157e308
// 1.7976931348623157e309; // infinity
// Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
// Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false

// comparison does not work due to unsafe numbers
// Number.MAX_VALUE < Number.MAX_VALUE + 1; // false

// Number("0x1"); // 1
// BigInt("0x2"); // 2

// console.log((Number.MAX_SAFE_INTEGER ** 5).toString());

console.time();
const a = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
const b = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
console.log(a, b);

console.log(a < b);
console.log(9007199254740991n < 9007199254740992n);

console.timeEnd();
