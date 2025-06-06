function fibo(n) {
  // F{0}=0\ F{1}=1
  if (n <= 1) {
    return n;
  }

  // Recursive
  const fib = fibo(n - 1) + fibo(n - 2);

  // return the result
  return fib;
}
console.log(fibo(8)); //21
