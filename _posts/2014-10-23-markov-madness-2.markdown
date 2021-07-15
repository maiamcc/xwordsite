---
layout: post
title: "Markov Madness, part 2"
date: 2014-10-23 16:13:34 -0400
comments: true
categories: [recurse center]
---
(If you're confused, see [my previous post on my Markov generator adventures](/blog/2014/10/23/markov-madness/).)

The other thing I got up to today was implementing some sort of (questionable) part-of-speech-based intelligence. The idea was to have a dictionary for parts of speech, in addition to a dictionary of words. Then the work flow would go something like this:

1. start with a random seed
2. what part of speech should come next? Given the POS's we already have, pick at random one that might follow it.
3. given the words we have, pick a word that might follow _of the correct part of speech_. If none exists, repeat from step 2.

Now, using word trigrams and POS trigrams, the above process doesn't really add much beyond what using plain 'ol word trigrams gets you. Could I make something better, though, by using, say, 4-grams or 5-grams of parts of speech?<!--more-->

Well... I'll leave that to you to decide. Here are a bunch of different sample texts from Pride and Prejudice. All are word-gram-3. Some have no POS support, some are POS-gram-3, and some are POS-gram-4. (POS-gram-5, incidentally, doesn't really work---the requirements on what word you need to come next get so specific that there generally isn't one and the program crashes.) Which of these seem the most sensical? Can you guess which are no-POS, POS-gram-3, and POS-gram-4? (There are three of each.) Make your guesses---and then, if you want to check yourself, look at the HTML source for answers.

> 1) 'into a marriage with Miss Bennet. Miss Bingley's pretended regard." "Would you believe it, Lizzy, that is the most uncomfortable in her favour. Bingley was then disclosed in the same house with the length of his going away when I tell you, Miss Bennet. I send no compliments to Mr. Darcy:---but let me shift for myself; and, perhaps, if I were agreeing that we should all be there by Mrs. Hurst and Miss Bingley in a prudential light it places Mr. Darcy, by the awkwardness of the letter nor its writer were at the gate in the discharge of his'<!--POS-gram = 4-->

> 2) 'difference of situation and temper. Consider Mr. Collins's picture of a sort of man; and of late it has not time to reply, but hurrying instantly to her so expressively, and shook hands with great enjoyment; and the mere ceremonious salutation attending his entrance. Anxious and uneasy, the period to which you have pleasure," said Bingley; "and I am in earnest. I speak plainer? Do not wish me such an assurance of it, that the match with a bow of superior society; but I know very well able to do it, she turned suddenly towards him and Mr. Darcy, "There'<!--POS-gram = 3-->

> 3) 'from my thoughts." "When they all are." "All young ladies were ready enough to determine her feelings in the time. Good gracious! when I have always seen a great deal more than I might have sufficient charms; and though the probability of error, and seek to recommend them," replied he; "they are married!" Elizabeth read on: "I have no wish of seeing him almost for the felicity which a pair of fine eyes in amazement, but was too happy, however, and if he sees enough of Bingley's being withheld from seeing Jane, she seriously hoped he might change his mind' <!--no POS support-->

> 4) 'ever have courage to shew Mrs. Gardiner's former residence, and where she had listened to her eyes, envied everyone to whom they would have been impossible for us to Miss Darcy, who had only set that down as soon as they used to be privileged to whisper to Elizabeth, "I hope not so. Painful recollections will not have forgotten where she was ready enough to make her resigned. As for my impertinence?" "For the liveliness of your own. But we are better acquainted---" He was resolutely silent, however, and, from a circulating, he started back, and begging pardon, protested' <!--no POS support-->

> 5) 'months. Of having another daughter married to Mr. Bingley. It was at length return home; and she was to bring it in my own doing, and I thought only of the peace of the world, must make Hunsford extremely dull to a real, strong attachment. Pray, how violent was Mr. Bingley's chaise to go with him; and unwilling, for her sister's sake, to provoke him. Elizabeth was the son of old Wickham, the late perverse occurrences had thrown on many of the largest folios in the neighbourhood." "Oh! no---it is not so handsome as Wickham; or, rather, he has not'<!--POS-gram = 4-->

> 6) 'Darcy's praise occupied the chief of it. Can I speak plainer? Do not let your fancy run away with you. You will be an object of it, but Colonel Fitzwilliam was no more than she knew it myself, as it had not yet been able to enter the ---shire. She had no other reply to this effect: "I have been to persuade him against returning into Hertfordshire, anxiously renewing them at any time, etc. etc.; and if not, it would be gone in five minutes, you meant it to another, not to an end by exclamations and inquiries about the'<!--POS-gram = 3-->

> 7) 'but tell Lydia she shall have as much a debt of gratitude cannot enough acknowledge. By this time have been too pleasantly engaged to my fair cousins, though my brother left us yesterday, he imagined that we have found some resemblance of character to love each other in large mixed parties, it is the man! Now, Lizzy, I hardly know myself what it is no occasion for such a man would satisfy me. We will settle so quietly, and live in my power, I am very far from suspecting that she was discontented, she fancied that praise of himself, of' <!--no POS support-->

> 8) 'the opportunity of saying: "Is your sister make such an evil. Human nature is particularly prone to it, and sometimes with playful gaiety, replied to her housekeeping, her parish and her uncle had been her firmest opinion. Her keenest attention was suddenly roused by the middle of June, Kitty was too much sense to recommend myself to hope the best, in accepting a man on the subject. This will never be in want of money. Younger sons cannot marry where they were grieved, how shocking it was to distribute her presents and describe the newest fashions. When this information was'<!--POS-gram = 3-->

> 9) 'the pleasantness of the park," he replied, "it has been my profession---I was brought up by him alone, was such as did think, than such a way." "I can readily believe," answered he gravely, "that reports may vary greatly with respect to me; and as she had not by any particular person, for though the uncomfortable feelings arising from all restraint, his life that, instead of a man of five-and-twenty. His air was grave and stately, and his relation of my nephew! Unfeeling, selfish girl! Do you think of themselves before anybody and everybody! If my vanity had taken on'<!--POS-gram = 4-->
