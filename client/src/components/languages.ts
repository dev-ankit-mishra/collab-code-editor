export const language: { label: string; version: string; boilerplate: string }[] = [];

const lang = [
  { label: "Java", boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
  { label: "C++", boilerplate: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}` },
  { label: "C", boilerplate: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}` },
  { label: "JavaScript", boilerplate: `console.log("Hello, World!");` },
  { label: "TypeScript", boilerplate: `const greet = (name: string): void => {\n    console.log("Hello, " + name);\n};\n\ngreet("World");` },
  { label: "Ruby", boilerplate: `puts "Hello, World!"` },
  { label: "Go", boilerplate: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}` },
  { label: "Rust", boilerplate: `fn main() {\n    println!("Hello, World!");\n}` },
  { label: "Python", boilerplate: `print("Hello, World!")` },
  { label: "Kotlin", boilerplate: `fun main() {\n    println("Hello, World!")\n}` }
];

async function getRuntimes() {
  const res = await fetch("https://emkc.org/api/v2/piston/runtimes");
  const data = await res.json();

  if (data) {
    const seen = new Set<string>(); // prevent duplicates by language name

    data.forEach((runtime: { language: string; version: string }) => {
      const langName = runtime.language.toLowerCase();
      const matchedLang = lang.find(l => l.label.toLowerCase() === langName);

      if (matchedLang && !seen.has(langName)) {
        seen.add(langName);

        language.push({
          label: matchedLang.label,
          version: runtime.version,
          boilerplate: matchedLang.boilerplate
        });
      }
    });

    console.log(language); // See the final filtered list
  }
}

getRuntimes();
