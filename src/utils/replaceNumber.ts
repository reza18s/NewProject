const e2p = (s?: string) =>
  s?.toString().replace(/\d/g, (d) => {
    const digitsMap = "۰۱۲۳۴۵۶۷۸۹";
    return digitsMap[parseInt(d, 10)];
  });

const p2e = (s: string) =>
  s.toString().replace(/[۰-۹]/g, (d) => `${"0123456789".indexOf(d)}`);

const sp = (number: number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return e2p(joinedNumber);
};

export { e2p, p2e, sp };
