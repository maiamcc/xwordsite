---
layout: post
title: "Markov Madness, part 1"
date: 2014-10-23 15:52:47 -0400
comments: true
categories: [recurse center]
---
Man, I've hardly written code in _three whole weeks!_ Such a strange feelings, after 3 solid months of coding. Anyway, back at Hacker School for the day, and with my OPW application in, I've been itching to actually _write some code_, so I revisited my old [Markov generator](https://github.com/maiamcc/markovgen) project, which takes a training corpus and generates psuedo-random texts in the style of that corpus.<!--more-->

I've tried a few different tacks today for getting texts that actually resembled English and not just word-soup. The first was using n-grams of varying n's when generating my texts[^1]. n = 1 is just random words and not worth testing. n = 2 is very nearly gibberish. n = 3 and n = 4 are the sweet spot of sensical-yet-random text; when we get to n = 5, it tends to be several verbatim sentences from the corpus patched together in odd ways, and at n = 6, it is almost consistently exact quotes from the text. At a guess, in more quote-unquote complex texts (i.e., those with more unique words) n = 5 will be closer to verbatim, and in texts with more common words, there will be more room for deviation from any pattern that the generator falls into, and thus n = 5 will be distinct from the original text. Here are generated texts using n-grams of increasing n, from _Pride and Prejudice_.

n = 2:
> 'to-morrow; and as she could not do. He looked towards clearing him, Charlotte Lucas, when you an admiration will afford, and the establishment were said Miss Darcy was at no reason away, where Mr. Bingley was meant by me. I am sure," she had scarcely ever mentioned to her, "these offenses might have the temptation, added, "that my manner in the walk to Mr. Darcy liked him." "But it was diffuse in money which had ended only could listen, therefore, pardon for having very day confirms my dear," said by their present party; but their separation. To these three or'

n = 3:
> 'been used to want to speak with composure when she ceased speaking, "I have just received from Mr. Collins." "From Mr. Collins! and what can he mean by apologising for being simply dressed. She likes to have on the instrument, Eliza, and you ought to have on the length of his description of Jane. She felt it incumbent on her side. But I am in such awe of her wishes. Their sister's wedding day arrived; and Jane seem so wholly unconnected with any other man it would go. But he found, in reply to his ideas of happiness! But it'

n = 4:
> 'was his conviction of its being heard. Elizabeth soon saw that she was not very differently engaged. "There is also one other person in the room. Colonel Fitzwilliam seemed really glad to see them; he had felt the smallest interest, and from none received either attention or pleasure. Miss Bennet he acknowledged to be pretty, but she smiled too much. Mrs. Hurst and Miss Bingley was uncivil to her, and she felt how little would be gained by her attempting to pursue them. Calling back the servant, therefore, she commissioned him, though in so breathless an accent as made her'

n = 5
> 'some manner connected with the letter he held. It suddenly struck her that it might be from Lady Catherine; and she anticipated with dismay all the consequent explanations. She followed her father to the fire place, and they both sat down. He then said, "I have received a letter this morning that has astonished me exceedingly. As it principally concerns yourself, you ought to know its contents. I did not know what to think." "She is a very good kind of woman, not too clever to be a valuable neighbour to Mrs. Bennet. They had several children. The eldest of'

Compare that to n-grams of increasing n from _Harry Potter and the Chamber of Secrets_. There's the same pattern of higher n's both making more sense and being closer to the original text, but we don't start getting verbatim text excerpts until n = 6.

n = 2:
> 'knock people knew what Ginny out, reflecting the train harder than his hand- picked it into a nobody heard him - three of that your fault," retorted Draco. "The diary," said in the stairs. "Remember, boy was always top Ron had in Transfiguration. "I don't care, he saw the clouds and George must've opened the elf came back in the pitch - the wiser -" "But, Professor," said Harry had never touched Harry's own free rein from his feet climbing through the full of whom were trickling down to turn up off the ground with a beacon of excitement gripped'

n = 3
> 'Near sunset, Fred and George were now crammed into boxes on the side road where the photographer had stepped on what to do. "Not lost are you, Myrtle?" said Hermione as the Weasleys slouched outside with Harry behind them. "No, he was doing something and I, um, I asked her not to smile. And Lockhart was looking furious, and as he tried to put himself under arrest. It drives Mum mad." "That's the main road ahead, but their street was empty. "Okay," he said. "Id better get going, Hagrid, it's Transfiguration next and I've got -well, I think he did,"'

n = 4
> 'say no to a large bottle of something labeled Skele-Gro. "You're in for a rough night," she said, pouring out a steaming beakerful and handing it to them. "I told your dad how to use a telephone last summer - he'll know. Call me at the orphanage she lived just long enough to copy down a name or date, then falling asleep again. He had made up his mind what he was going to tear it. While Ron kept watch he tugged and twisted, and at last, after several tense minutes, the paper came free. It was a nightmare -'

n = 5
> 'side of the field. "They love it here .... Dad's too soft with them; he thinks they're funny . . . ." He swept off his plumed hat and bowed them inside. It was an incredible sight. The dungeon was full of hundreds of pearly-white, translucent people, mostly drifting around a crowded dance floor, waltzing to the dreadful, quavering sound of thirty musical saws, played by an orchestra on a raised, black-draped platform. A chandelier overhead blazed midnight-blue with a thousand more black candles. Their breath rose in a mist before them; it was like stepping into a freezer. "Shall'

n = 6
> 'into the station. Harry had caught the Hogwarts Express the previous year. The tricky part was getting onto platform nine and three-quarters, which wasn't visible to the Muggle eye. What you had to do was walk through the solid barrier dividing platforms nine and ten. It didn't hurt, but it had to be done carefully so that none of the Muggles noticed you vanishing. "Percy first," said Mrs. Weasley, looking nervously at the clock overhead, which showed they had only five minutes to disappear casually through the barrier. Percy strode briskly forward and vanished. Mr. Weasley went next; Fred and'

Fun bonus: infinite loop!

> "as much as possible prevented her husband from pressing her; but Mr. Collins could not conceal his apprehension of Lady Catherine's being rather displeased by her staying at home. When they were gone, Elizabeth, as if intending to exasperate herself as much as possible prevented her husband from pressing her; but Mr. Collins could not conceal his apprehension of Lady Catherine's being rather displeased by her staying at home. When they were gone, Elizabeth, as if intending to exasperate herself as much as possible prevented her husband from pressing her; but Mr. Collins could not conceal his apprehension of Lady"

[^1] an ngram is a group of n words considered at a time, where the first n-1 words key to the last word. So for instance, if I'm working with tri-grams (n = 3) and the phrases "it is a," "it is silly", and "it is Frank" appear in my corpus, when my corpus gets loaded into a big dictionary, `[('it', 'is')]` will key to `['a', 'silly', 'Frank']`. Then, when I'm generating random text and I already have "it is", I can look in `mydict[('it', 'is')]` for words that might possibly follow that phrase. I then pick one at random, stick it onto the end of my text (say, "it is Frank") and repeat (`mydict[('is', 'Frank')] ---> ['sick', 'angry','the']).
