# React CV

A React-cv is an interactive project that from provided data creates aesthetic software developer CV. Project is a HTML-CSS-React-TS template that outputs page of A4 size, ready to be printed to pdf file.

## What you need to know - put briefly

* Clone repo, install packages. Run.
* Not long after start you will see a print window. Close it if you don't want to print it now.
* Duplicate `.env.example` file and change its name to `.env`. Insert `VITE_REAL_DATA_ENABLED=true` if you want to use real data, leave `VITE_REAL_DATA_ENABLED` as `false` if you do not.
* Change data in every `data-real.ts` file by directory. Observe changes live.
* `randomPokemonAddCount` in OtherSkills is highly recommended to be increased.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ifmcjthenknczny/react-cv
   ```
2. Install the dependencies in project main directory:
   ```bash
   yarn install
   ```

## Usage

3. Go to the main directory of a project and run:
   ```bash
   yarn dev
   ```

   The project should be available at `http://localhost:5173` and you should be able to see changes in real-time.

4. Clone file `.env.example`, rename it to `.env` and change its content to:
   ```javascript
   VITE_REAL_DATA_ENABLED=true
   ```
if you want to use your own data.

5. Change name of every `data-example.ts` to `data-real.ts`. Edit them adding your data you want to be put in resume. To edit photo put your photo in `/src/assets` as `photo-real.jpg`.

## TODO

* Centralize data input to one editable JSON/.ts file in main directory.
* Minimize the output.
* Export PDF directly to file.
* Automate margins to fit A4 page

## Motivation
The honest reason I created it is because instead of learning LaTeX for this one-time project I preferred to focus on practising my CSS/React skills.

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

## Contact

For questions or feedback, please reach out via GitHub.
[ifmcjthenknczny](https://github.com/ifmcjthenknczny)  

Project Link: [https://github.com/ifmcjthenknczny/react-cv](https://github.com/ifmcjthenknczny/react-cv)