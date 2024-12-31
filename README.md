# React CV

## Description

A React-cv is an interactive project that from provided data creates aesthetic software developer CV. Honestly, I created it because instead of learning LaTeX, I preferred to practise my CSS skills. Project is a HTML-CSS-React-TS template that outputs page of A4 size, ready to be printed to pdf file.

## What you need to know - put briefly

* Clone repo, install packages. Run.
* Not long after start you will see a print window. Close it if you don't want to print it now.
* Set boolean in `dataFlag.ts` to `true` if you want to use real data.
* Change data in every `data-real.ts` file by directory. Observe changes live.
* `randomPokemonAddCount` in OtherSkills is highly recommended to be increased.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ifmcjthenknczny/react-cv
   ```
2. Install the dependencies in project main directory:
   ```bash
   npm install
   ```

## Usage

3. Go to the main directory of a project and run:
    ```bash
    npm start
    ```

4. Change the content of `src/dataFlag.ts` into:
```js
export const REAL_DATA_ENABLED = false
```
if you want to use your own data.

5. Change name of every `data-example.ts` to `data-real.ts`. Edit them at your discretion. To edit photo put your photo in `/src/assets` as `photo-real.jpg`.

## TODO

* Centralize data input to one editable JSON/.ts file in main directory.
* Minimize the output.
* Export the PDF directly to file.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please reach out via GitHub.
[ifmcjthenknczny](https://github.com/ifmcjthenknczny)
Project Link: [https://github.com/ifmcjthenknczny/react-cv](https://github.com/ifmcjthenknczny/react-cv)