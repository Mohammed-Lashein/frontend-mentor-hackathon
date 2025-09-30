# frontend-mentor-hackathon
This is my implementation of the wheather app that is present in the frontend mentor hackathon


# A developer's journey 🛣️
A lot of tutorials show the final version of the code and touch the bare minimum of all of the gotchas present throughout the project.  
This is not the case here!  
This repo is intended as a documentation of a one-month journey through trying to create a weather app as part of the hackathon.  

## How is it different? 🤔
1. I document the details and discuss different design decisions 
2. If I took a wrong route, I document that instead of just having the knowledge for myself 🗺️
3. I use AI tools like chatgpt and claude, but I **don't write a single line of code that I don't fully understand**.  
After getting info from these tools, I ask them to tell me some resources to search the correctness of the info they provided, and I search within these resources to check the correctness of each piece of information. 

4. Finally, I try to follow principles from clean code, refactoring and code complete books. You will find me using principles from these books and mentioning them throught the journey

Without further saying, Let's get started!
____
The above introduction was a nice one though.  
Last couple of weeks, I was busy with a project for a [one month summer training provided by ministry of communications and Information Technology in Egypt](https://github.com/Mohammed-Lashein/ITI-frontend-1-month-summer-training), so I didn't have time to complete the weather app.  

Since the training ended, now I have a one week to deliver the project. I am not sure if I can make it on time, but this is an opportunity that can't be missed. 
_____

# Table of contents
- [Importance of prototyping](#importance-of-prototyping)
- [Newer options for the `find` command](#newer-options-for-the-find-command)

### Importance of prototyping
I have a separate local version of the project, where I experiment different approaches for doing almost everything (from styling, to writing logic, to fighthing TypeScript).  
I remember an excerpt from Code Complete book that emphasizes the importance of prototyping in a non-production environment, with a non-production mindset in order to learn best from prototyping. 

To find more, you can refer to Chapter 5: Design in construction -- Experimental Prototyping section.  

That's why you may find a lot of commits batched in one day, but actually they took longer than that because I experiment in another local version of the project.

---

### Newer options for the `find` command

This is a bit off topic, but I wanted to search for files that were created on September 17th on my laptop. I am sure that the terminal capabilities can achieve this task, but I don't know what to write in the terminal.

I asked claude and he generated the command for me. But it had some new flags that I want to document here for future reference.

The command:

```bash
find . -type f -newermt "2025-09-17" ! -newermt "2025-09-18"
```

Explanation of the new terms to me in the command:

- `-newermt "2025-09-17"`: finds files modified/created on or after september 17,2025 at 00:00:00 (claude is just being specific)
- `! -newermt "2025-09-18"`: Combined with `!` for negation, this excludes files from September 18 onwards.

After reading through the man page of `find` command, it seems that there is no flag called `newermt`!  
Instead, ~~the flag has 2 forms~~ we have 2 flags: `-newer` and `-newerXY`

The flag doesn't actually have 2 forms, but they are 2 **separate** flags, `-newer` and `-newerXY`.

From the man page:

> `-newerXY` reference: Succeeds if timestamp *X* of the file being considered is newer than timestamp *Y* of the file reference. The letters *X* and *Y* can be any of the following letters (I will write the ones that are important to us, since there are other letters that I don't understand their functionality):

- `a`: The access time of the file reference (I haven't personally tried that option)
- `B`: The *birth* time of the file reference (I haven't tried this option yet, so same as `a`)
- `m`: The modification time of the file reference
- `t`: reference is interpreted directly as a time

claude provided a clearer explanation than the man page:

- `m`: check the **m**odification time of files
- `t`: compare against a **t**imestamp string (rather than another file)

---

That was a good explanation though, but after re-reading it, I think it is contradictory:

> `-newerXY` reference: Succeeds if timestamp *X* of the file being considered is newer than timestamp *Y* of the file reference. The letters *X* and *Y* can be any of the following letters...

Isn't the file *Y* supposed to have a newer timestamp than the file *X*?  
We have just provided the path that the command will search in, where are the files we are talking about?

Claude answered: The `.` in the command tells the `find` command where to search, It is not the "reference" file mentioned in the documentation (okay that makes sense).

The meaning of the condition `-newermt "2025-09-17" ! -newermt "2025-09-18"`: Go find the files modified **after** September 17th but NOT modified after September 18th (The overlap of these 2 conditions gives us files from September 17th).

-- End of claude answer --  
My Reflection: Things are starting to make sense!  
Claude ended the answer with an amazing sentence:

> Does this make more sense now? The confusion comes from the fact that we're using timestamps as references, not actual files!

I saw this sentence's application on trying this command:

```bash
find . -type f -newer "2025-09-17" ! -newer "2025-09-18"
```

Trying the above command threw an error:

> [!WARNING] > `find: 2025-09-17`: No such file or directory

That's exactly the benefit of the `t` flag. It is used to tell the command that we are providing timestamps, not filenames.

But wait a minute. I tried:

```bash
find . -type f -newert "2025-09-17" ! -newer "2025-09-18"
```

And got the error:

> [!WARNING] > `find: -newert`: unknown primary or operator

Why can't the `t` flag be used directly with the `newer` flag?

-> Claude explained further (and I am paraphrasing): There are two similar flags for the find command, `-newer` and `-newerXY`.  
So when we tried `-newert`, we got an error because there exists no flag with that signature.

Claude pointed that out in a good sentence:

> `-newerXY` is not the `-newer` flag with letters added to it. It's a completely different flag format where both `X` and `Y` are required together.

That's why we need both letters. Omitting any of them will result in the error:

> [!WARNING] > `find: -newert`: unknown primary or operator

Okay now I understand. One more last question: I tried changing the order from `-newermt` to `-newertm` and I got:

> [!WARNING]
> find: -newertm: unknown primary or operator

Why am I getting that error although the docs didn't mention that the values for `X` and `Y` should be passed in order?

Claude answered: The order does matter, even if the documentation doesn't explicitly say so.
The format is strictly `-newerXY` where:

- **First Letter `X`**: timestamp of the **file being examined**
- **Second Letter `Y`**: how to interpret the **reference**

Nice excerpts from claude (also has some modifications by me):

> This doesn't make sense (using `-newertm`) because:
>
> - Files don't have a "timestamp timestamp" (`t` is only valid for the reference side (the **Y** side), not the file side)
> - You can't examine a file's "t". Files only have `a` (access), `m` (modification), `c` (change) and `B` (birth)

So, `t` is only valid in the **Y** position, which is why `-newermt` works but `newertm` doesn't.

-- End of claude answer --  
Actually after reading carefully in the man page of `find`, I found this:

> Some combinations are invalid; for example, it is invalid for `X` to be `t`.  
>  Some combinations are not implemented on all systems; for example `B` is not supported on all systems.  
> If an invalid or unsupported combination of `XY` is specified, a fatal error results.

Although the documentation didn't have an explanation about why `X` can't be `t`. At least they documented that rule.
