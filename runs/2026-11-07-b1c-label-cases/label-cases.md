# The short label: person and label cases

Worker: https://b18d45dd-orked-m1-proxy.kneebonewebdesign.workers.dev
Run: 2026-11-07T15:34:46.186Z

## "M., my sister, she runs a one-woman cleaning business" (person case (B1))
- /m1 as the old intake sends it: settled / named_individual, prompt_version 2026-11-07b
- /m1 with_label (F1): settled / named_individual. Same grape as without: true
- F1 label: "M.", is_self false, 1 words, words not in the answer: none, check {"check":"ok"}
- /label (E4): "M.", is_self false, 1 words, words not in the answer: none, check {"check":"ok"}, prompt_version 2026-11-07b

## "a colleague who manages bookings for our plumbing crew" (person case (B1))
- /m1 as the old intake sends it: settled / described_unnamed, prompt_version 2026-11-07b
- /m1 with_label (F1): settled / described_unnamed. Same grape as without: true
- F1 label: "your colleague who manages bookings", is_self false, 5 words, words not in the answer: none, check {"check":"ok"}
- /label (E4): "your colleague who manages bookings", is_self false, 5 words, words not in the answer: none, check {"check":"ok"}, prompt_version 2026-11-07b

## "freelancers I know" (person case (B1))
- /m1 as the old intake sends it: turbid / category_only, prompt_version 2026-11-07b
- /m1 with_label (F1): turbid / category_only. Same grape as without: true
- F1 label: "the freelancers you know", is_self false, 4 words, words not in the answer: none, check {"check":"ok"}
- /label (E4): "the freelancers you know", is_self false, 4 words, words not in the answer: none, check {"check":"ok"}, prompt_version 2026-11-07b

## "Jamie Kneebone, it's me" (label case (B1b))
- /m1 as the old intake sends it: clearing / self, prompt_version 2026-11-07b
- /m1 with_label (F1): clearing / self. Same grape as without: true
- F1 label: "you", is_self true, 1 words, words not in the answer: none, check {"check":"self","said":"you"}
- /label (E4): "you", is_self true, 1 words, words not in the answer: none, check {"check":"self","said":"you"}, prompt_version 2026-11-07b

## "Myself of course, and some of my football friends" (label case (B1b))
- /m1 as the old intake sends it: turbid / category_only, prompt_version 2026-11-07b
- /m1 with_label (F1): turbid / category_only. Same grape as without: true
- F1 label: "your football friends", is_self false, 3 words, words not in the answer: none, check {"check":"ok"}
- /label (E4): "your football friends", is_self false, 3 words, words not in the answer: none, check {"check":"ok"}, prompt_version 2026-11-07b

## "freelancers I know" (label case (B1b))
- /m1 as the old intake sends it: turbid / category_only, prompt_version 2026-11-07b
- /m1 with_label (F1): turbid / category_only. Same grape as without: true
- F1 label: "the freelancers you know", is_self false, 4 words, words not in the answer: none, check {"check":"ok"}
- /label (E4): "the freelancers you know", is_self false, 4 words, words not in the answer: none, check {"check":"ok"}, prompt_version 2026-11-07b
