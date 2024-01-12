# bLooper

bLooper is a script designed for the game Kingdom of Loathing. It serves as a wrapper for 1-day Community Service ascensions, automatically running the farming script "garbo" before and after the Community Service (CS) run. It incorporates several automatic optimizations to maximize profits.

## Features

- **Wrapper for CS Ascensions:** Automates the process of running "garbo" before and after each ascension.
- **Automatic Optimizations:** Includes built-in strategies to enhance profit-making.
- **User-Friendly:** Easy to set up and use, even for those new to scripting in Kingdom of Loathing.

## Requirements

- All requirements of the CS Script of your choice.

## Installation
```
git checkout glitched94/blooper release
```

## Usage

If you're using bLooper for the first time, run the initialization command:
```
bLooper init
```
Otherwise:
```
bLooper
```

```mermaid
graph TD
    subgraph L1 [Leg 1]
        direction LR
        A[EVENT: Start] --> B[Breakfast\n\n- Join Home Clan\n- Mafia Breakfast\n- Double Ice\n- Big Book of Every Skill]
        B --> C[PreRun Optimizations\n\n- Essential Tofu\n- Golden Dice\n- Lodestone\n- Set valueOfAdventure]
        C -->|Run Bounties?| D1[Garbo Nobarf\nBountiful Hunt All]
        C -->|Skip Bounties| D2[Garbo]
        D1 --> D2
    end

    subgraph L1E [Leg 1 End]
        direction LR
        E[Plant Garden\nTiny Stillsuit\nCONSUME]
        E -->|Has Drunkula's Wineglass| F[Overdrunk with Wineglass\n\n- Get Drunk\n- Break Hippy Stone\n- Go to School\n- Punch Mirrors\n- Burn Stuff\n- Fight Stuff\n- Set valueOfAdventure\n- Overdrunk Garbo\n- Fight Stuff Again]
        E -->|No Drunkula's Wineglass| G[Overdrunk without Wineglass\n\n- Get Drunk\n- Comb the Beach\n- Break Hippy Stone\n- Go to School\n- Punch Mirrors\n- Burn Stuff\n- Fight Stuff]
        F --> H[EVENT: Leg 1 End]
        G --> H
        H --> I[Community Service\n\n- Prepare Pulls\n- Ascend]
    end

    subgraph L2 [Leg 2]
        direction LR
        J[EVENT: Leg 2 Start]
        J --> K[Run Ascension Script]
        K --> L[Breakfast\n\n- Shrug AT Songs\n- Join Home Clan\n- Mafia Breakfast\n- Double Ice\n- Big Book of Every Skill]
        L --> M[PostRun Optimizations\n\n- Essential Tofu\n- Golden Dice\n- Lodestone\n- Refuel Asdon\n- Open Rain-Doh\n- Set valueOfAdventure]
        M -->|Run Bounties?| N1[Garbo Nobarf\nBountiful Hunt All]
        M -->|Skip Bounties| N2[Garbo]
        N1 --> N2
    end

    subgraph L2E [Leg 2 End]
        direction LR
        O[Campground Setup\n\n- Install Clockwork Maid\n- Install Meat Maid\n- Install Meat Butler]
        O --> P[Nightcap\n\n- Tiny Stillsuit\n- Equip Jammies\n- Overdrink]
        P --> Q[EVENT: Leg 2 End]
    end
    
    L1 --> L1E --> L2 --> L2E
```

## Contributing

Contributions to bLooper are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request with a clear description of your changes.

## License

MIT License

Copyright (c) 2024 The Powers That Be

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
