import { Observable } from "rxjs";

const output = document.getElementById("output");
const button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }

        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy({attempts: 3, delay: 1500}));
}

function loadWithFetch(url: string) {
    return fetch(url);
}

function retryStrategy({attempts = 4, delay = 1000}) {
    return errors => errors.scan((acc, value) => {
        console.log(acc, value);
        return acc + 1;
    }, 0)
        .takeWhile(acc => acc < attempts)
        .delay(delay);
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerHTML = m.title;
        output.appendChild(div);
    });
}

//load("movies.json").subscribe(renderMovies);

click.flatMap(e => load("moviess.json"))
    .subscribe(
    movies => renderMovies(movies),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
);
