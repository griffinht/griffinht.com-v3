const Bruh = () => {
    return (
        <div>
            <div hx-ext="sse" sse-connect="cursor">
                <form hx-post="cursor" hx-trigger="sse:cursor">
                    <input type="number" name="x" value="50" />
                    <input type="number" name="y" value="35" />
                </form>
            </div>
            <div hx-ext="sse" sse-connect="cursors" sse-swap="message">
                <div sse-swap="cursor1"></div>
                <div sse-swap="cursor2"></div>
                <div sse-swap="cursor3"></div>
                <div sse-swap="cursor4"></div>
                <div sse-swap="cursor5"></div>
                <div sse-swap="cursor6"></div>
                <div sse-swap="cursor7"></div>
            </div>
                {/*<!--<div hx-ext="sse" sse-connect="cursors/34" sse-swap="message" sse-close="close">
                </div>-->*/}
        </div>
    )
}