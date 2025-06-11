---
title: Plausible deniability
---

How to use hidden volumes when someone forces you to reveal your password. {% .lead %}

---

## What is it?

You have two passwords:
- Password A: Shows boring files
- Password B: Shows real files

When forced to give up your password, give them A. They can't prove B exists.

## Why you might need this

- Border crossings
- Court orders
- Laptop theft
- Any situation where "I forgot my password" won't work

---

## How it works

Both volumes live in the same file:
- Standard volume: The main part
- Hidden volume: Lives in the "free space"
- Free space is filled with random data
- Hidden volume looks exactly like random data

Technically: Good encryption is indistinguishable from randomness. The hidden volume can't be detected because it looks like the random padding that's there anyway.

---

## Setting it up

1. Check "Enable Hidden Volume" when creating storage
2. Set two completely different passwords
3. Put decoy files in standard volume
4. Put real files in hidden volume

**Password tips**:
- Standard: Something believable ("FamilyPhotos2024")
- Hidden: Something unrelated and stronger
- Never use similar passwords
- Write them down somewhere safe

**Space**: Hidden volume gets about 10-20% of total space. Kurpod manages this automatically.

---

## Using it properly

### What to put where

**Standard volume**: Boring but real stuff
- Actual family photos
- Work documents
- Tax returns
- Anything you'd legitimately encrypt

**Hidden volume**: The real stuff
- Whatever you're actually hiding

### Don't blow your cover

1. Actually use the standard volume regularly
2. Don't access hidden volume often
3. Use incognito mode for hidden access
4. Have a story ready ("I encrypt because of identity theft")
5. Make the standard volume believable

---

## What it protects against

**Works for**:
- Border guards asking for passwords
- Court orders to decrypt
- Laptop thieves
- Basic scrutiny

**Doesn't work for**:
- Keyloggers (captures both passwords)
- Someone watching you long-term
- Advanced forensics on a running system
- Determined adversaries with resources

## Important warnings

1. **Never tell anyone** about the hidden volume
2. **Actually use** the standard volume
3. **Be consistent** in your behavior
4. **Have a story** ready
5. **This isn't magic** - it's just math that creates doubt

---

## Example scenarios

**Crossing a border**:
- Standard: Travel photos, work docs
- Hidden: Whatever you don't want found
- Story: "I encrypt for identity theft protection"

**Company laptop**:
- Standard: Normal work files
- Hidden: Job search, personal stuff
- Story: "IT policy requires encryption"

---

## Technical details (if you care)

- Both passwords use the same salt but generate different keys
- Hidden volume has no headers or signatures
- Encrypted data has the same randomness as padding
- File timestamps only update for standard volume
- No way to determine how much space is actually used

---

## FAQ

**Can I add hidden volume later?**
No. Must be done at creation.

**How much space for hidden volume?**
About 10-20% of total. Automatic.

**What if I forget the hidden password?**
It's gone forever. No recovery.

**Can it be detected?**
Not with current tech if used properly.

**Is this legal?**
Depends on your country. Some places have laws requiring you to give up encryption keys. Know your local laws.

**What if they demand both passwords?**
You can't give what you "forgot". But this is getting into movie scenarios.

---

## Summary

Hidden volumes let you have two sets of files with different passwords. Give up one password under pressure, keep the other secret. It works because of math, not magic.

**Remember**:
- This is beta software
- Perfect security doesn't exist
- Your behavior matters as much as the tech
- Don't use this for illegal stuff