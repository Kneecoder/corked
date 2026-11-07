# The question writer: a sample

Worker: https://b18d45dd-orked-m1-proxy.kneebonewebdesign.workers.dev
Run: 2026-11-07T15:35:16.549Z
Each slot 3 times. Answers marked (stand-in) are not the brief's.

## The garden (fix)

Spark: "A tool to analyse gardens and it calculates how many times a year you need upkeep and what tools you need."

- F1 answer: "My grandpa, 76."
- F2 answer: "He called me to come fix it, he had no idea what to do."
- F3 answer: "Gvie im an estiamte of the work to be done to keep it a nice looking garden"
- F4 answer: "An app that maps a garden and tells you how often it needs upkeep and which tools you need. (stand-in)"

### F1

1. "Who is the last person you saw unsure about how often their garden needed upkeep, or was it you?"
2. "Who is the last person you saw unsure about how often their garden needed upkeep, or was it you?"
3. "Who is the last person you saw unsure about how often their garden needed upkeep, even if that person is you?"

### F2

1. "The last time your grandpa needed to do upkeep on his garden, what did he actually do?"
2. "The last time your grandpa's garden needed upkeep, what did he do?"
3. "The last time your grandpa needed to do upkeep on his garden, what did he actually do?"

### F3

1. "If your idea had been there when your grandpa called you, what one thing should it have done for him?"
2. "If your idea had been there when your grandpa called you, what one thing should it have done for him?"
3. "If your idea had been there when your grandpa called you, what one thing should it have told him?"

### F5

1. "If you asked your grandpa about that moment he called you, what do you think he would say?"
2. "If you asked your grandpa about that moment, what do you think he would say?"
3. "If you asked your grandpa about that moment, what do you think he would say?"

## The rental (fix)

Spark: "An AI tool that helps you when you rent a place to document the current conditions, easily."

- F1 answer: "Me, when I moved into my flat in March."
- F2 answer: "I took a lot of pictures of the outlets and sinks, but I did not know what mattered. (stand-in)"
- F3 answer: "Tell me which rooms and fittings to photograph, and keep it all in one report. (stand-in)"
- F4 answer: "An app that walks you through recording the state of a rented flat on move in day. (stand-in)"
- F7 answer: "Sam, my neighbour, who moved into the flat upstairs last month (stand-in)"

### F1

1. "Who is the last person you saw struggle to document the condition of a rental, or was it you?"
2. "Who is the last person you saw struggle to document the condition of a rental, or was it you?"
3. "Who is the last person you saw struggle to document the condition of a rental, or was that you?"

### F2

1. "When you moved into your flat in March, what did you actually do to document its condition?"
2. "When you moved into your flat in March, what did you actually do to document the conditions?"
3. "When you moved into your flat in March, what did you actually do to document its condition?"

### F3

1. "If your idea had been there when you moved into your flat in March, what one thing should it have done for you?"
2. "If your idea could have done one thing for you moving into that flat in March, what would it have been?"
3. "If your idea had been there when you moved into your flat in March, what is the one thing it should have done for you?"

### F5

1. "When you think back to photographing your flat without knowing what mattered, what do you imagine you would say about that moment?"
2. "If you asked Sam what it felt like to document the flat without guidance, what do you think he would say?"
3. "If you asked Sam what moving into the flat upstairs was like, what do you think he would say about documenting the conditions?"

## The football quiz (experiment)

Spark: "A trivia app for football fans to challenge each others ballknowledge."

- E1 answer: "My friends quiz each other about old match results in our group chat. (stand-in)"
- E2 answer: "Like they want one more round straight away. (stand-in)"

### E1

1. "Do football fans already quiz each other on ball knowledge anywhere, and when did you last see it happen?"
2. "Do football fans already challenge each other on their knowledge somewhere, and when did you last see it happen?"
3. "Do football fans already challenge each other's knowledge somewhere, in a group chat or another app, and when did you last see it happen?"

### E2

1. "What do you want a football fan to feel in their first minute of playing?"
2. "What do you want a football fan to feel in their first minute of using your app?"
3. "What do you want a football fan to feel in their first minute of using your app?"

### E3

1. "What is the smallest version of this you could build so your friends could try a round this week?"
2. "What is the smallest version you could build this week so your friends could try it in the group chat?"
3. "What is the smallest version of this you could build so your friends could try a round of it this week?"

## The daily picture game (experiment)

Spark: "A daily game where you describe one picture in a single sentence."

- E1 answer: "My friends post their Wordle scores in our group chat every morning. (stand-in)"
- E2 answer: "Curious what the others wrote about the same picture. (stand-in)"

### E1

1. "Do people already play something like this, by hand or in another app, and when did you last see it happen?"
2. "Do people already play something like this, in an app or on paper, and when did you last see it happen?"
3. "Do people already play something like this, in another app or on paper, and when did you last see it happen?"

### E2

1. "What should someone feel in their first minute writing their sentence about the picture?"
2. "What should someone feel in their first minute writing their sentence for the picture?"
3. "What do you want someone to feel in their first minute of describing a picture?"

### E3

1. "What is the smallest version of this you could put in front of your friends this week?"
2. "What is the smallest version of this you could put in front of your friends this week?"
3. "What is the smallest version of this you could put in front of your friends this week?"

## The Zendesk tool (fix)

Spark: "A tool that views your Zendesk instance and gives instructions on how to build custom applications in it based on how it's setup."

- F1 answer: "A developer at my last job who had to build a Zendesk app for our support team. (stand-in)"
- F2 answer: "He spent two days reading the Zendesk docs and asked on the developer forum. (stand-in)"
- F3 answer: "Tell him which parts of our setup the app had to fit. (stand-in)"
- F4 answer: "A tool that reads your Zendesk setup and tells you how to build an app for it. (stand-in)"

### F1

1. "Who's the last person you saw struggle to build a custom Zendesk app that fit how their instance was set up — was it you?" **worker check: dash** **breaks: a dash**
2. "Who's the last person you saw struggle to build a custom Zendesk app that fit how their instance was set up — or was that you?" **worker check: too_long** **breaks: more than 25 words, a dash**
3. "Who's the last person who needed to build a custom Zendesk app but struggled because the setup of their instance was hard to account for? Could be you." **worker check: question_mark** **breaks: one question mark, at the end, more than 25 words**

### F2

1. "The last time that developer had to build a Zendesk app, what did they actually do to figure out how to set it up?"
2. "The last time that developer had to build a Zendesk app, what did they actually do to figure out how to set it up?"
3. "The last time that developer had to build a Zendesk app, what did they actually do to figure out how to set it up?"

### F3

1. "If your tool had been there during those two days, what is the one thing it should have done for that developer?"
2. "If your tool had been there those two days, what one thing should it have done for that developer?"
3. "If your tool had been there during those two days, what one thing should it have done for that developer?"

### F5

1. "What do you think that developer would say about those two days if you asked him right now?"
2. "What do you think that developer would say about those two days if you asked him right now?"
3. "What do you think that developer would say if you asked him what those two days were actually like?"

## Rule breaks the script found

- The Zendesk tool F1 run 1: "Who's the last person you saw struggle to build a custom Zendesk app that fit how their instance was set up — was it you?" (worker: dash, a dash)
- The Zendesk tool F1 run 2: "Who's the last person you saw struggle to build a custom Zendesk app that fit how their instance was set up — or was that you?" (worker: too_long, more than 25 words, a dash)
- The Zendesk tool F1 run 3: "Who's the last person who needed to build a custom Zendesk app but struggled because the setup of their instance was hard to account for? Could be you." (worker: question_mark, one question mark, at the end, more than 25 words)
