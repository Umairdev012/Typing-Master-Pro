/*=========================================================
    Typing Master Pro
    js/texts.js
    Part 1
=========================================================*/

const TEXTS = {

    easy: [

        "the cat sat on the mat and looked at the dog before it ran away into the yard",

        "my best friend likes to read books every day after school and drink fresh milk",

        "the sun shines over the green hill while birds sing and children play outside",

        "we walk to the park every morning and watch the ducks swim across the small lake",

        "good food and fresh water help every person stay healthy and feel happy each day",

        "a little boy found a red ball under the tree and smiled with great joy all afternoon",

        "they went to the market to buy bread eggs fruit and milk before going back home",

        "our class reads short stories together because learning new words is always fun",

        "small dogs love to chase balls around the yard until they become tired and rest",

        "every family should spend time together and enjoy simple moments filled with love"

    ],

    medium: [

`The quick brown fox jumps over the lazy dog. This sentence is famous because it contains every letter of the alphabet. Practicing it regularly helps improve typing speed and keyboard familiarity.`,

`Technology continues to evolve every single year, bringing smarter devices and better software. Learning new digital skills allows people to adapt quickly and solve real-world problems with confidence.`,

`A successful developer writes clean code, tests features carefully, and documents important functions. These habits make projects easier to maintain and reduce unexpected bugs during development.`,

`Reading books improves vocabulary, strengthens imagination, and enhances communication skills. Even twenty minutes of reading every day can create a meaningful difference over time.`,

`Traveling introduces people to different cultures, traditions, and languages. Every journey teaches valuable lessons that cannot always be learned inside a classroom or office.`,

`Healthy routines include regular exercise, balanced meals, quality sleep, and proper hydration. Small daily improvements often produce significant long-term benefits for physical and mental well-being.`,

`Modern websites should be responsive, fast, and accessible to everyone. Optimized images, semantic HTML, and efficient JavaScript all contribute to an excellent user experience.`,

`Teamwork succeeds when members communicate clearly, respect each other's ideas, and focus on shared goals. Collaboration often leads to more creative and effective solutions.`,

`Artificial intelligence is changing many industries by automating repetitive tasks and providing useful insights from large amounts of data. Human creativity remains equally important.`,

`Time management helps people complete important work without unnecessary stress. Planning tasks, avoiding distractions, and staying organized improve both productivity and personal satisfaction.`

    ]

};

/*=========================================================
    WORD COLLECTIONS
=========================================================*/

const WORD_BANK = {

    easy: [

        "the","cat","dog","bird","tree","road","book","pen","sun","moon",
        "milk","bread","food","home","play","walk","green","blue","happy","small",
        "large","apple","chair","table","glass","water","family","school","garden","flower",
        "river","house","light","smile","laugh","friend","music","dance","paper","phone",
        "mouse","plant","cloud","rain","snow","winter","summer","spring","autumn","child"

    ],

    medium: [

        "computer","keyboard","internet","developer","website","responsive","software","database","performance","security",
        "framework","application","network","browser","language","project","function","variable","document","structure",
        "creative","solution","professional","technology","experience","education","business","marketing","strategy","product",
        "design","frontend","backend","mobile","desktop","optimization","quality","testing","feature","system"

    ]

};



/*=========================================================
    js/texts.js
    Part 2
    HARD + CODE + NUMBERS
=========================================================*/

Object.assign(TEXTS, {

    hard: [

`Programming requires discipline, patience, and consistent practice. Developers frequently analyze complex algorithms, optimize performance, and implement scalable architectures while maintaining readability and reliability across evolving software ecosystems.`,

`Cybersecurity professionals continuously monitor sophisticated threats, investigate vulnerabilities, and strengthen defensive infrastructures. Proper authentication, encryption, and regular security audits significantly reduce organizational risks.`,

`Innovation rarely appears overnight; instead, it emerges through experimentation, persistence, thoughtful iteration, and constructive feedback. Every successful invention represents countless refinements before reaching practical implementation.`,

`Artificial intelligence combines mathematics, statistics, optimization, and computer science. Although machine learning models automate predictions, responsible human oversight remains essential for ethical decision-making and transparency.`,

`Software architecture determines maintainability, scalability, and long-term flexibility. Well-designed systems separate concerns, minimize dependencies, and encourage reusable components through modular engineering principles.`,

`Successful entrepreneurs embrace uncertainty, evaluate calculated risks, and continuously refine business strategies. Adaptability, resilience, and customer-focused thinking often distinguish sustainable organizations from short-lived ventures.`,

`Scientific discoveries frequently challenge established assumptions; researchers collect evidence, formulate hypotheses, perform controlled experiments, and publish peer-reviewed findings to advance collective human knowledge.`,

`Effective communication extends beyond vocabulary; it requires empathy, active listening, precise articulation, and thoughtful consideration of cultural differences, especially within globally distributed professional teams.`,

`High-performance web applications emphasize asynchronous processing, efficient caching, optimized asset delivery, semantic markup, accessibility compliance, and measurable improvements through continuous performance monitoring.`,

`Leadership demands accountability, strategic planning, emotional intelligence, and the courage to make difficult decisions. Exceptional leaders inspire confidence while empowering others to achieve ambitious shared objectives.`

    ],


    code: [

`const sum = (a, b) => { return a + b; };`,

`function greet(name){ console.log(\`Hello \${name}\`); }`,

`for(let i=0;i<10;i++){ console.log(i); }`,

`if(user.isLoggedIn){ dashboard.render(); } else { login.show(); }`,

`const users = data.filter(user => user.active === true);`,

`async function load(){ const res = await fetch(url); return res.json(); }`,

`class Person { constructor(name){ this.name = name; } speak(){ return this.name; } }`,

`const total = items.reduce((sum,item)=>sum+item.price,0);`,

`document.querySelector("#btn").addEventListener("click", startTest);`,

`try{ execute(); }catch(error){ console.error(error.message); }`

    ],


    numbers: [

`In 2024 more than 8 billion people lived on Earth, and many used smartphones every single day.`,

`Room 205 contains 18 computers, 2 printers, and 48 chairs for students.`,

`The train traveled 325 kilometers in 4 hours while maintaining an average speed of 81 kilometers per hour.`,

`John purchased 15 notebooks for 750 rupees and received a discount of 50 rupees.`,

`Version 3.2.1 fixed 127 reported bugs while introducing 19 new features.`,

`A marathon covers exactly 42.195 kilometers, requiring months of disciplined preparation.`,

`Server 12 processed 15,460 requests in only 30 minutes with 99.98 percent uptime.`,

`The company hired 85 employees during 2025 and opened 3 additional offices.`,

`A student scored 97 out of 100 in mathematics and 94 out of 100 in science.`,

`Flight PK302 departed at 08:45 and arrived at 11:20 after covering approximately 820 kilometers.`

    ]

});


/*=========================================================
    EXTRA WORD BANKS
=========================================================*/

Object.assign(WORD_BANK, {

    hard: [

        "architecture","authentication","optimization","extraordinary","responsibility",
        "communication","configuration","implementation","accessibility","performance",
        "compatibility","maintainability","vulnerability","sustainability","documentation",
        "microservices","transformation","sophisticated","experimentation","synchronization",
        "infrastructure","cybersecurity","cryptography","internationalization","professionalism",
        "entrepreneurship","intelligence","development","integration","collaboration",
        "algorithm","engineering","consistency","accountability","modularity",
        "reliability","abstraction","deployment","architecture","computation"

    ],

    code: [

        "const","let","var","function","return","class","extends","constructor",
        "async","await","fetch","Promise","map","filter","reduce","for","while",
        "switch","case","break","continue","if","else","import","export",
        "document","window","querySelector","addEventListener","JSON",
        "parse","stringify","Object","Array","Number","Boolean","null",
        "undefined","true","false"

    ],

    numbers: [

        "100","200","300","450","500","750","999","1024","2048","4096",
        "2024","2025","2026","12","24","48","60","75","90","120",
        "15","25","50","100","1000","5000","7500","9999","42","365"

    ]

});




/*=========================================================
    js/texts.js
    Part 3
    QUOTES + HELPER FUNCTIONS
=========================================================*/

Object.assign(TEXTS, {

    quotes: {

        short: [

            "Stay hungry, stay foolish. — Steve Jobs",
            "Knowledge is power. — Francis Bacon",
            "Practice makes perfect.",
            "Dream big and dare to fail.",
            "Success is earned, never given.",
            "The journey matters more than the destination.",
            "Small steps every day create big results.",
            "Action is the foundation of success.",
            "Believe you can and you're halfway there.",
            "Discipline beats motivation."

        ],

        medium: [

            "The future belongs to those who believe in the beauty of their dreams. Every achievement starts with the decision to try and continue despite challenges.",

            "Success usually comes to people who are too busy improving themselves to spend time comparing their progress with everyone else around them.",

            "Education is not preparation for life; education is life itself. Continuous learning builds confidence, creativity, and meaningful opportunities.",

            "Do not wait for perfect conditions before starting. Progress comes from consistent action, learning from mistakes, and improving every single day.",

            "Your habits determine your future more than your intentions. Small positive actions repeated daily create extraordinary long-term achievements.",

            "A good programmer solves problems, not just writes code. Understanding the problem always comes before building the solution.",

            "Confidence grows through preparation, experience, and persistence. Every challenge completed makes the next challenge easier to overcome.",

            "Quality is never an accident. It is the result of intelligent effort, continuous improvement, and attention to detail.",

            "Great opportunities often begin as small ideas. Dedication and consistency transform simple ideas into meaningful accomplishments.",

            "Failure is simply another lesson on the road to mastery. Learn, improve, and continue moving forward."

        ],

        long: [

            "Success is rarely the result of one extraordinary effort. Instead, it is built through thousands of small decisions made consistently over time. Every day offers an opportunity to improve your knowledge, sharpen your skills, and become a better version of yourself.",

            "Technology continues to reshape the world at an incredible pace. Those who embrace lifelong learning, adapt to change, and remain curious will always discover new opportunities regardless of how rapidly industries evolve around them.",

            "Every successful developer starts as a beginner. Through persistence, careful practice, problem solving, debugging, and continuous learning, complex programming concepts eventually become familiar tools for creating useful software.",

            "Discipline is the bridge between goals and accomplishments. Motivation may come and go, but consistent habits performed every day create remarkable achievements that appear impossible to those who never begin.",

            "Innovation requires courage to experiment, patience to fail repeatedly, wisdom to learn from mistakes, and determination to continue improving until meaningful solutions emerge from persistent effort.",

            "Communication is more than speaking clearly. It includes listening carefully, understanding different perspectives, asking thoughtful questions, and expressing ideas respectfully so collaboration becomes productive and enjoyable.",

            "The strongest professionals are not those who know everything, but those who remain humble enough to learn something new every single day while sharing knowledge generously with others.",

            "Building software is both an engineering discipline and a creative process. Technical knowledge provides the foundation, while curiosity, empathy, and imagination transform ordinary applications into exceptional user experiences.",

            "Personal growth begins when comfort ends. Every challenge teaches resilience, every mistake teaches wisdom, and every success reflects the value of perseverance through difficult moments.",

            "Time is the only resource that cannot be replaced. Investing it wisely in learning, health, relationships, and meaningful work creates lasting rewards that far exceed temporary pleasures."

        ]

    }

});


/*=========================================================
    HELPER FUNCTIONS
=========================================================*/

function randomItem(arr){

    return arr[
        Math.floor(
            Math.random() * arr.length
        )
    ];

}


/*=========================================================
    RANDOM TEXT
=========================================================*/

function getRandomText(mode = "time", difficulty = "medium"){

    switch(mode){

        case "easy":
            return randomItem(TEXTS.easy);

        case "medium":
            return randomItem(TEXTS.medium);

        case "hard":
            return randomItem(TEXTS.hard);

        case "code":
            return randomItem(TEXTS.code);

        case "numbers":
            return randomItem(TEXTS.numbers);

        default:

            if(TEXTS[difficulty]){

                return randomItem(TEXTS[difficulty]);

            }

            return randomItem(TEXTS.medium);

    }

}


/*=========================================================
    QUOTES
=========================================================*/

function getQuote(length = "medium"){

    if(!TEXTS.quotes[length]){

        length = "medium";

    }

    return randomItem(TEXTS.quotes[length]);

}


/*=========================================================
    WORD LIST
=========================================================*/

function getWordList(count = 50, difficulty = "medium"){

    let bank = WORD_BANK[difficulty] || WORD_BANK.medium;

    let words = [];

    for(let i = 0; i < count; i++){

        words.push(

            bank[
                Math.floor(
                    Math.random() * bank.length
                )
            ]

        );

    }

    return words.join(" ");

}


/*=========================================================
    GLOBAL EXPORTS
=========================================================*/

window.TEXTS = TEXTS;

window.WORD_BANK = WORD_BANK;

window.getRandomText = getRandomText;

window.getQuote = getQuote;

window.getWordList = getWordList;