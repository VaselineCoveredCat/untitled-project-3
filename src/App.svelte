<script>
  let targetAmount = "";
  let monthlySalary = "";
  let deadline = "";

  let result = 0;

  function handleSubmit() {
    targetAmount = Number(targetAmount);
    monthlySalary = Number(monthlySalary);
    deadline = Number(deadline);

    const offsetLow = targetAmount - targetAmount * 0.02;
    const offsetHigh = targetAmount + targetAmount * 0.02;

    let max = 100;
    let min = 0;
    let mid;

    let bank;

    if (monthlySalary * deadline > targetAmount) {
      top: for (let step = 0; step < 100; step++) {
        mid = (min + max) / 2;
        bank = 0;

        for (let i = 0; i < deadline; i++) {
          bank = bank + monthlySalary * (mid / 100);
        }

        if (bank >= offsetLow && bank <= offsetHigh) {
          result = mid;
          break top;
        } else if (bank < offsetLow) {
          min = mid;
        } else if (bank > offsetHigh) {
          max = mid;
        }
      }
    }

    targetAmount = "";
    monthlySalary = "";
    deadline = "";
  }
</script>

<main class="max-w-800 min-h-100 mx-auto p-4 md-p-0">
  <h1>Savings Calculator</h1>
  <p>
    Calculate how much money you need to contribute each month in order to
    arrive at specific savings goal.
  </p>

  <form
    on:submit|preventDefault={handleSubmit}
    class="gap-4 grid grid-1 max-w-400 md-gap-2 mx-auto my-4 md-my-2"
  >
    <div>
      <label for="targetamount">Savings goal</label>
      <input
        bind:value={targetAmount}
        id="targetamount"
        inputmode="numeric"
        name="targetamount"
        pattern={`\\d{6,9}`}
        type="text"
        required
      />
    </div>

    <div>
      <label for="monthlysalary">Monthly salary</label>
      <input
        bind:value={monthlySalary}
        id="monthlysalary"
        inputmode="numeric"
        name="monthlysalary"
        pattern={`\\d{6,9}`}
        type="text"
        required
      />
    </div>

    <div>
      <label for="deadline">Deadline in months</label>
      <input
        bind:value={deadline}
        id="deadline"
        inputmode="numeric"
        name="deadline"
        pattern={`\\d{1,3}`}
        type="text"
        required
      />
    </div>

    <button type="submit">Calculate</button>
  </form>

  <p class="txt-center" aria-live="polite">
    {#if result > 0}
      <span class="font-bold txt-size-h1">{result.toFixed(1)}</span>%
    {/if}
  </p>
</main>

<footer class="p-4 txt-center">
  <p>&copy; 2022 Vaseline Covered Cat</p>
</footer>
