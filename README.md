# React CV

A React-cv is an interactive project that creates aesthetic software developer CV from provided data. Project is a HTML-CSS-React-TS template that outputs page of A4 size, ready to be saved to pdf file.

## What you need to know - put briefly

* Clone repo, install packages. Run.
* Not long after start you will see a print window. Close it if you don't want to save the file just now.
* Edit `data.json` in the project root (see `data.example.json` for structure). Put your photo in `src/assets/photo.jpg` path. 

## Usage recomendations
* For a smaller PDF (~1 MB), use a photo up to ~600 px on the longer edge and reasonable JPEG quality (e.g. 80%). For logo URLs use of max 128px thumbs is recommended.
* Works best with Chrome with use of option "Save to PDF". Unfortunatelly, printing to pdf using Firefox makes almost all text content unselectable. While printing, enable option "Background graphics".
* `randomPokemonAddCount` in OtherSkills is highly recommended to be increased when using your own data ;)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ifmcjthenknczny/react-cv
   ```
2. Install the dependencies in project main directory:
   ```bash
   yarn install
   ```
3. Go to the main directory of a project and run:
   ```bash
   yarn dev
   ```
The project should be available at `http://localhost:5173`, through you would probably need to refresh the page to see changes.

4. Copy `data.example.json` as `data.json`, then fill it with your content. Put your photo in `src/assets` directory and rename it to `photo.jpg`.

## Structure of data.example.json

The `data.json` file (based on `data.example.json`) has the following structure:

| Key | Description |
|-----|-------------|
| **heading** | `name` – full name, `position` – job title |
| **socials** | Array of contacts: each item has `type` (city, github, email, phone, linkedin), `label` and `url` |
| **whoAmI** | Object with `content` – short “about me” text |
| **experiences** | Array of jobs: `job`, `company` (company name), `date` (array e.g. `["03/2023","now"]`), `description` (array of bullet points), `shortCompany` (company abbreviation), `url` (optional) |
| **education** | Array of entries: `type`, `uni`, `spec`, `thesis`, `date` (array), `uniUrl` (optional) |
| **languages** | Array of languages: `level` (1–5), `name`, `description` (e.g. "native", "A1") |
| **keySkills** | Array of key skills: `name`, `color` (hex, e.g. `#61dafb`), `logoUrl` (optional), `fontColor` (optional), `synonym` (optional) |
| **otherSkills** | `tech` – array of technologies, `excludedTech` – names to exclude from matching, `synonyms` – name mapping, `potential` - array of tech names too obscure to list visually, but readable for LLMs |
| **responsibilities** | `companyName` and `activities` – array of `{ label, percent }` (breakdown of responsibilities in %) |
| **projects** | Array of projects: `name`, `description`, optionally `owner` |

## Empty page / no content

If you see a blank page instead of the CV, **`data.json` likely failed validation**. Open developer tools (**F12**) and check the **Console** tab – validation errors are shown there and indicate what to fix in the data file.

## Motivation
The honest reason I created it is because instead of learning LaTeX for this one-time project I preferred to focus on practising my CSS/React skills.

## TODO
* Automatically minimize the PDF output.
* Export PDF directly to file.
* Automate margins to fit A4 page.
* Import language and country flags from library.
* Internationalization.
* Validate images loaded properly.
* Limit CV save to one page.

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

## Contact

For questions or feedback, please reach out via GitHub.
[ifmcjthenknczny](https://github.com/ifmcjthenknczny)  

Project Link: [https://github.com/ifmcjthenknczny/react-cv](https://github.com/ifmcjthenknczny/react-cv)