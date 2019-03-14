import uuid from "uuid";
import { ISnippet } from "./models/ISnippet";


export default class DummyData {
    public static js(): ISnippet {
        return {
            body: `function funct() {
    console.log("hello world");
}`,
            description: "",
            language: "javascript",
            title: "Example!",
            uuid: uuid.v4(),
        };
    }

    public static cpp(): ISnippet {
        return {
            body: `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello, World!";
    return 0;
}`,
            description: "",
            language: "cpp",
            title: "Example!",
            uuid: uuid.v4(),
        };
    }
}
