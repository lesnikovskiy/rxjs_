import { Observable } from "rxjs";

let circle = document.getElementById("circle");
let source = Observable.fromEvent(document, "mousemove")
    .map((e: MouseEvent) => {
        return {
            x: e.clientX,
            y: e.clientY
        };
    })
    .filter(value => value.x < 500)
    .delay(200);

function onNext(value) {
    circle.style.left = `${value.x}px`;
    circle.style.top = `${value.y}px`;
}

source.subscribe(
    onNext,
    error => console.log(`error: ${error}`),
    () => console.log("complete")
);

// import { Observable } from "rxjs";

// // drawing example
// let circle = document.getElementById("circle");
// let source = Observable.fromEvent(document, "mousemove")
//     .map((e: MouseEvent) => {
//         return {
//             which: e.which,
//             x: e.clientX,
//             y: e.clientY
//         };
//     })
//     .filter(value => value.which === 1)
//     .delay(80);

// function onNext(value) {
//     circle.style.left = `${value.x}px`;
//     circle.style.top = `${value.y}px`;

//     let element = circle.cloneNode(true);
//     document.body.appendChild(element);
// }

// source.subscribe(
//     onNext,
//     error => console.log(`error: ${error}`),
//     () => console.log("complete")
// );

