type args<T> = {
  s?: number;
  e?: number;
  array?: T[];
};
export const random = <T>({ array, s, e }: args<T>) => {
  if (s && e) {
    return Math.random() * e + s;
  } else if (array) {
    return array[Math.floor(Math.random() * array.length)];
  } else {
    throw Error(`Provid ${!s && "s"} ${!e && "e"} `);
  }
};
