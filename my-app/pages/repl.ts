function chat(history: string[], message: string) {
    return "hello"
}

function exec(code: string): string {
    try {
        return eval(code)
    } catch (e) {
        return String(e)
    }
}

async function run(history: string[]) {
    run(history.concat(exec(await chat(history, run(G)))))
} 

run(["you are in a js repl - please run a command"])



// factorio is a game abot automation user repl


// bash agent

// run curl icanhazip
// 1.1.1.1

// save it to bruh.txt
//

// show me
// ls
//bruh.txt

// agi
// hey bash agent run curl icanhazip