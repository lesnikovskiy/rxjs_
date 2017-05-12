import { Observable, Observer } from "rxjs";

let numbers = [1, 5, 10];
let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
);
