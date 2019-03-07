import {ISnippet} from './Models/ISnippet';
import uuid from "uuid";


export default class DummyData {
    public static js(): ISnippet {
        return {
            title: "Example!",
            language: "javascript",
            description: "",
            body: `function funct() { 
  console.log("hello world"); 
}`,
            uuid: uuid.v4()
        };
    }

    public static cpp(): ISnippet {
        return {
            title: "Example!",
            language: "cpp",
            description: "",
            body: `#include <iostream>
using namespace std;

int main() 
{
    cout << "Hello, World!";
    return 0;
}`,
            uuid: uuid.v4()
        };
    }
}