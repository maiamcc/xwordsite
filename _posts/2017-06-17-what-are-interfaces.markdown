---
layout: post
title: "What Are Interfaces?"
date: 2017-06-17 13:04:02 -0400
comments: true
categories: [tech, go]
---
This is a blog post about interfaces in Go. I wanted to write about a headscratcher that cost me several hours of work when I first started learning Go, and I figured I might as well start from the beginning and write the article on interfaces that I wish I had read back then. The story of my encounter with nil interfaces is coming soon, but for now, here's a brief and hopefully accessible piece on interfaces in Go.[^1] So, without further ado, I give you...

### What Is an Interface?

Coming from the dynamically-typed wild west of Python, one of the bits of Go that took the most getting used to was the idea of *interfaces*. An interface is a way of typing things according to their methods. If I want a function that can take any number of different types, so long as they have a given method (or two, or five) in common, I’ll want to use an interface to accomplish this (since I can’t pass in any old thing because of Go’s type safety rules). To give a concrete example, say I’ve got these classes: <!--more-->

```go
type octopus struct {
    numTentacles int
}

func (octopus) ooze() string {
    return "ink"
}

type slug struct {
    salted bool
}

func (slug) ooze() string {
    return "slime"
}
```


`slug` and `octopus` are their own types, but both have `ooze()` methods. If I wanted a function to make use of the `ooze` method, and didn’t know how to make effective use of interfaces, I might write something like this. Note that `interface{}` is a wild card and I'll explain why in a minute... but for now, just accept that this is the way we can allow this function to take either a slug OR an octopus (...or anything else, unfortunately) without Go complaining at us.

```go
func oozeAttack(slugOrOctopus interface{}) string {
    switch oozingThing := slugOrOctopus.(type) {
        case slug:
            // cast oozingThing as a slug
            return fmt.Sprintf("You got %s’d!", oozingThing.ooze())
        case octopus:
            // cast oozingThing as an octopus
            return fmt.Sprintf("You got %s’d!", oozingThing.ooze())
        default:
            panic(```This thing doesn't know how to ooze!
            ...It sucks that you were able to pass this in
            without the compiler complaining at you, but
            here we are.```)
    }
}
```

Ugh. Awkward, right? And it has repeated code, and it can potentially panic b/c we have no guarantees of the type of the thing we passed, and… ugh. No good. But luckily, I can use interfaces as they were meant to be used, and suddenly my code is a lot prettier:

```go
type oozer interface{
    // the signature of a function called "ooze",
    // which takes no args and returns a string
    ooze() string
}

func oozeAttack(o oozer) string {
    return fmt.Sprintf("You got %s’d!", o.ooze())
}
```

If an object has all of the methods required for an interface, we say that that object *implements* (or satisfies) that interface. In this case, both `octopus` and `slug` implement `oozer` because they both have `ooze()` methods. The compiler can check this for us, so we know that anything we pass into `oozeAttack` has an `ooze()` method and won’t break our code—in stark contrast to the example above, where we could pass in *literally anything* and just had to pray that it wouldn’t cause a panic at runtime.


### Okay, But What Is an `interface{}`?

If you’ve been using Go for more than a couple of days, you’ve probably stumbled across `interface{}`, the mythical and mysterious empty interface ([click here for dramatic effect](https://www.youtube.com/watch?v=bW7Op86ox9g)). (I even used it in the example above.) The empty interface baffled me for a long time. I understood that practically, it was a type wildcard—you used it anywhere you weren’t sure of the type of a thing. If I have a function that’s going to get passed *some thing* but I don’t know what the type of that thing is, I’ll use `interface{}` so nothing breaks:

```go
func printMysteryObject(thing interface{}) {
        fmt.Printf("Your mystery thing is: %v (of type %T)", thing, thing)
}
```

But it was only after I started thinking about what interfaces actually are, and reading some blog posts, that I figured out why this works. `interface{}` is this:

```go
type BoringInterface interface {
        // … nothing to see here …
}
```

It’s an interface that requires no methods! And so any object at all will satisfy this interface, because any object in Go has 0+ methods. I finally understand what the flip this thing is. So exciting.

Stay tuned for part 2 in this series, "When Interfaces Go Nil (dun dun dunnn)".

[^1]: I need to make the disclaimer that lots of other folks have written about this, and the [Go blogpost on *The Laws of Reflection*](https://blog.golang.org/laws-of-reflection) probably explains this stuff better than I do. That said, I hope this blog post is more to the point, and perhaps more entertaining. (Mad props to [Travis McDemus](http://aoeu.github.io/) for inspiration for this excellent example of how interfaces work, which I find 100% more accessible than the `io.Reader/Writer` examples that get used in all the canonical Go blogposts about interfaces.)
