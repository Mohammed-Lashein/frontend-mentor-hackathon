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

Since the training ended, now I have one week to deliver the project. I am not sure if I can make it on time, but this is an opportunity that can't be missed. 
_____
### After a one week update
Time has passed and the submission is tomorrow. Unfortunately, I couldn't finish all of the required functionality (I have a prototype version that I code in first before adding code here). I also didn't have time to write clean maintainable code. 

Required functionalities that haven't been implemented yet: 
1. Search functionality
2. Adding Favorite places

It is important to note for readers that the code of the redux store is a bit convoluted. It is not the best possible approach to using redux, but I didn't have time to follow the best practices.  

For future readers, I will refine this repo so that it acts as a gentle introduction to best programming practices and also as a solution for the challenge.

# Table of contents
- [Importance of prototyping](#importance-of-prototyping)
- [Newer options for the `find` command](#newer-options-for-the-find-command)
- [Why are asterisks turned into underscores?](#why-are-asterisks-turned-into-underscores)
- [Regarding modifying tailwind theme variables](#regarding-modifying-tailwind-theme-variables)
- [css `font-face` directive explained](#a-nice-article-about-font-face)
- [React `setState` type](#react-setstate-type)
- [Using tailwind modified theme variables](#using-tailwind-modified-theme-variables)
- [TypeScript errors on implementing click outside functionality](#typescript-errors-on-implementing-click-outside-functionality)
- [Is `font-family` inherited by default?](#is-font-family-inherited-by-default)
- [A tale of two dropdowns](#a-tale-of-two-dropdowns)
- [The `DailyForecastContainer` alignment issues](#the-dailyforecastcontainer-alignment-issues)
- [Writing the store reducer initial state](#writing-the-store-reducer-initial-state)

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
_____
### Why are asterisks turned into underscores? 
On saving this markdown file, I noticed that the asterisks are changed into underscores on save. I asked claude and gemini about so, and they told me that this is a feature of prettier which can't be changed.  

I searched the docs but couldn't find them. I asked claude why they didn't mention that in prettier docs, and he answered an amazing answer: 
> Why It's Not in the Docs  
Prettier's docs focus on available options. Since there's **no option to change this behavior** (it's hardcoded), they don't document it as a configurable feature. It's just part of how Prettier handles Markdown by design.
If you want to keep your asterisks, disabling Prettier for Markdown files is really the cleanest solution.
_____
### Regarding modifying tailwind theme variables
Note that in tailwind v4, (the config file is deprecated)[https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file]. We should modify the `theme` layer directly instead.
_____
### A nice article about `@font-face`
I found a [nice article](https://css-tricks.com/snippets/css/using-font-face-in-css/) from css tricks that explains the `@font-face` we used in our `index.css` to apply the project's custom fonts.
_____
### React `setState` type
This is my first time to write a type for react `setState` function: 
```ts
type TriggerButtonProps = {
  setIsUnitsListOpen: React.Dispatch<React.SetStateAction<boolean>>
}
```
I think that the type is a bit verbose, since I got it from vscode intellisense on hovering over the `setIsUnitsListOpen` function. I found that this syntax is mentioned in [react typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#basic-prop-types-examples) (see the last example in the examples box)
____
### Using tailwind modified theme variables
The variables we declared in `index.css` like `--spacing-*` can be used directly like `p-600` instead of manually writing `p-[var(--spacing-600)]`. It is amazing that tailwind makes design customization so easy!
_____
### TypeScript errors on implementing click outside functionality
Given this code snippet: 
```jsx
function UnitsDropdown() {
  const [isUnitsListOpen, setIsUnitsListOpen] = useState(true)
    const unitsDropdownRef = useRef(null) 

    useEffect(() => {
      function handleClickOutside(e: React.MouseEvent) {
        if(unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target)) {
          setIsUnitsListOpen(false)
        }
      }
      if(isUnitsListOpen) {
        document.addEventListener('click', handleClickOutside)
      }
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }, [isUnitsListOpen])
}
```
The `contains()` method has squiggly lines below it and a TS error: 
> [!WARNING]
> Property 'contains' does not exist on type 'never'

I am accustomed to assigning a default value to  `useRef()` as `null`. What is wrong with TS?  
Since initially we have assigned `unitsDropdownRef` a value of `null`, TS has inferred that `unitsDropdownRef.current` will always have a value of `null`.  
What is the solution then?  
```jsx
function UnitsDropdown() {
  const [isUnitsListOpen, setIsUnitsListOpen] = useState(true)
    const unitsDropdownRef = useRef<null | HTMLElement>(null) // now TS inference works as expected
}
```

But note that when we make the above change, another TS error will arise from the `e.target` part: 
> [!WARNING]
> Argument of type 'EventTarget' is not assignable to parameter of type 'Node'.
  Type 'EventTarget' is missing the following properties from type 'Node': baseURI, childNodes, firstChild, isConnected, and 43 more

TS isn't sure that `e.target` will be of type **Node**, so let's assert it: 
```jsx
function UnitsDropdown() {
  const [isUnitsListOpen, setIsUnitsListOpen] = useState(true)
    const unitsDropdownRef = useRef<null | HTMLElement>(null)

    useEffect(() => {
      function handleClickOutside(e: React.MouseEvent) {
        if(unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) { // The assertion that TS wanted
          setIsUnitsListOpen(false)
        }
      }
      if(isUnitsListOpen) {
        document.addEventListener('click', handleClickOutside)
      }
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }, [isUnitsListOpen])
}
```
Why did the error occur in the first place?  
~~Since `e.target` is typed as `EventTarget | null`, we need to assert `contains()` method that `e.target` is a Node.~~
The above line was claude's explanation. But on looking into the generated TS code, it is a bit explicit: 
> Argument of type 'EventTarget' is not assignable to parameter of type 'Node'.  

There is no guarantee that `e.target` will be of type `Node`, so we need to assert TS about so.

**Last weird TS error:**
```jsx
function UnitsDropdown() {
  const [isUnitsListOpen, setIsUnitsListOpen] = useState(true)
    const unitsDropdownRef = useRef<null | HTMLDivElement>(null) 

    useEffect(() => {
      function handleClickOutside(e: React.MouseEvent) {
        const currentRef = unitsDropdownRef.current as HTMLElement
        if(unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
          setIsUnitsListOpen(false)
        }
      }
      if(isUnitsListOpen) {
        document.addEventListener('click', handleClickOutside) // squiggly lines below the function name
      }
      return () => {
        document.removeEventListener('click', handleClickOutside) // and here also
      }
    }, [isUnitsListOpen])
}
```
And the error doesn't make sense to me (except the 1st line): 
> No overload matches this call.  
Overload 1 of 2, '(type: "click", listener: (this: Document, ev: PointerEvent) => any, options?: boolean | AddEventListenerOptions | undefined): void', gave the following error.
Argument of type '(e: MouseEvent<Element, MouseEvent>) => void' is not assignable to parameter of type '(this: Document, ev: PointerEvent) => any'.
Types of parameters 'e' and 'ev' are incompatible.
Type 'PointerEvent' is missing the following properties from type 'MouseEvent<Element, MouseEvent>': nativeEvent, isDefaultPrevented, isPropagationStopped, persist
Overload 2 of 2, '(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void', gave the following error.
Argument of type '(e: MouseEvent<Element, MouseEvent>) => void' is not assignable to parameter of type 'EventListenerOrEventListenerObject'.
Type '(e: MouseEvent<Element, MouseEvent>) => void' is not assignable to type 'EventListener'.
Types of parameters 'e' and 'evt' are incompatible.
Type 'Event' is missing the following properties from type 'MouseEvent<Element, MouseEvent>': altKey, button, buttons, clientX, and 18 more.

After asking claude, he told me that because the function expects to be invoked with a DOM native `MouseEvent` not a synthetic `React.MouseEvent`.
_____
### Using a favicon
W3schools has [an article](https://www.w3schools.com/html/html_favicon.asp) that explains how to use a favicon. 
____
### Is `font-family` inherited by default? 
On working on the `WeatherCard` component, I wondered if our project-specific font should be explicitly inherited by each child element by calling `font-family: inherit`. But after asking claude, he told me that the `font-family` is inherited from the parent by default and there is no need to use `font-family: inherit`.  

That makes sense, because in simple html/css projects, we were used to setting the `font-family` on just the `body` then every element in the page followed that font.  
____
### A tale of two dropdowns
After finishing the `HourlyForecast` component, I was trying the app and I had the idea of opening the 2 dropdowns at the same time.  
I found a gotcha (which means "a sudden unforeseen problem" in North American English, according to Oxford dictionary) where on selecting a day from the dropdown in the `HourlyForecast` component, the `UnitsDropdown` also closed although nobody closed it.  

After reviewing the code of the "close on click outside functionality", I understood the problem: 
```ts
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    const currentRef = unitsDropdownRef.current as HTMLElement
    if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
      setIsUnitsListOpen(false)
    }
  }
  if (isUnitsListOpen) {
    document.addEventListener('click', handleClickOutside)
  }
  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
}, [isUnitsListOpen])
```
We are setting the event listener on the `document`, so any click will trigger it causing the dropdown to be closed!  

What is the solution?  
If we can just confine the event listener to the `unitsDropdownRef`... 🤔  
Yes it is possible! 
```ts
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    const currentRef = unitsDropdownRef.current as HTMLElement
    if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
      setIsUnitsListOpen(false)
    }
  }
  if (isUnitsListOpen) {
    // Now the listener is added on the dropdown element itself!
    unitsDropdownRef.current.addEventListener('click', handleClickOutside)
  }
  return () => {
    // Now the listener is removed from the dropdown element itself!
    unitsDropdownRef.current.addEventListener('click', handleClickOutside)
  }
}, [isUnitsListOpen])
```
Unfortunately, the above code showed squiggly lines under `unitsDropdownRef.current` saying: 
> [!WARNING]
> 'unitsDropdownRef.current' is possibly 'null'

No problem, I will use non-null assertions: 
```ts
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
        setIsUnitsListOpen(false)
      }
    }
    if (isUnitsListOpen) {
      unitsDropdownRef.current!.addEventListener('click', handleClickOutside)
    }
    return () => {
        unitsDropdownRef.current!.removeEventListener('click', handleClickOutside)
    }
  }, [isUnitsListOpen])
```
Okay that worked (now TS is happy) 🙌, But now the **app crashed** with vite printing this error to the console: 
> [!CAUTION]
> Uncaught TypeError: Cannot read properties of null (reading 'removeEventListener')

There should be a better solution.  
```ts
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
      setIsUnitsListOpen(false)
    }
  }
      if (isUnitsListOpen && unitsDropdownRef !== null) { // check that unitsDropdownRef is not null
    unitsDropdownRef.current.addEventListener('click', handleClickOutside)
  }
  return () => {
    if(unitsDropdownRef) {
      unitsDropdownRef.current.removeEventListener('click', handleClickOutside)
    }
  }
}, [isUnitsListOpen])
```
Now TS is recomplaining: 
> [!WARNING]
> 'unitsDropdownRef.current' is possibly 'null'

Maybe we should be more cautious: 
```ts
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
      setIsUnitsListOpen(false)
    }
  }
  if (isUnitsListOpen && unitsDropdownRef !== null && unitsDropdownRef.current !== null) {
    unitsDropdownRef.current.addEventListener('click', handleClickOutside)
  }
  return () => {
    if (unitsDropdownRef.current) {
      unitsDropdownRef.current.removeEventListener('click', handleClickOutside)
    }
  }
}, [isUnitsListOpen])
```
Exactly! Now TS is sure that `unitsDropdownRef.current` will never be null when we add an event listener to it.  

One last question: I tried another variation of the code which worked, but I asked claude if returning the cleanup function conditionally would affect the behavior of `useEffect`: 
```ts
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
      setIsUnitsListOpen(false)
    }
  }
  if (isUnitsListOpen && unitsDropdownRef !== null && unitsDropdownRef.current !== null) {
    unitsDropdownRef.current.addEventListener('click', handleClickOutside)
  return () => {
      unitsDropdownRef.current.removeEventListener('click', handleClickOutside)
  }
  }
}, [isUnitsListOpen])
```
He told me that yes conditionally returning the cleanup function would lead to problems. To exactly quote from his answer: 
>  Conditionally returning the cleanup function can cause React to lose track of cleanup and lead to memory leaks

**Important update:** After trying the code, it didn't work 😅.
On clicking outside the `UnitsDropdown` it didn't close. So I will implement a nice suggestion by claude which is **stop event propagation**: 
```tsx
// Somewhere in HourlyForecast.tsx file, in the DaysList component
function DaysList({ days, selectedDay, setSetselectedDay, setIsDaysListOpen }: DaysListProps) {
  return (
    <div className='rounded-6 border border-neutral-600 bg-neutral-800 p-2 w-[13.75rem] absolute right-6 top-20'>
      {days.map((day, i) => (
        <button
          className={`hover:bg-neutral-700 p-125 rounded-6 w-full text-left cursor-pointer ${
            day === selectedDay ? 'bg-neutral-700' : ''
          }`}
          key={i}
          onClick={(e) => {
            // This is the key!
            e.stopPropagation()
            setSetselectedDay(days[i])
            setIsDaysListOpen(false)
          }}
        >
          {day}
        </button>
      ))}
    </div>
  )
}
```
Now the intended functionality is working as expected. 
_____
### The `DailyForecastContainer` alignment issues
I was modifying the markup to make the design responsive, and while everything was going smoothly, this wasn't the case for `DailyForecastContainer`.  

I faced some problems with making it conformant to the figma design. Since I used flexbox, I couldn't have that granular control over the layout of the cards.  

I tried switching to grid trying this css declaration: 
```css
 grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```
But after some trying and seeing solutions for other participants, like [this submission](https://github.com/Riteshpatel-7/weather-app). I found that I need `auto-fit` instead of `auto-fill`. CSS tricks has an [amazing article](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/) that explains the difference. You can check it out!

One last note, the pixels value in `minmax(300px, 1fr)` makes the cards too large. I tried `100px` and it was a good option. 
_____
### Writing the store reducer initial state
Why did I add an initial value to the state passed to the reducer?  
To avoid the runtime errors that js throws when we try to access a property on a non-existing yet object. 

How did I know the structure of the initial state I will need?  
As I mentioned before, I have another prototype project that I experiment with before adding code here. But since time isn't on my side, I made one commit showing the final state structure as the initial state. 