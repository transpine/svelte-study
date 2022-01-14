<script>
  import Header from "~/components/Header.svelte";
  import ListContainer from "~/components/ListContainer.svelte";

  Object.assign(document.body.style, {
    backgroundImage: "url(/images/bg.jpg)",
    backgroundSize: "cover",
    backgroundColor: "darkgray",
  });
</script>

<Header />
<ListContainer />

<!-- <div class="list-container">
  <div class="lists">
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>

  </div>
  <div class="create-list" />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .list-container {
    width: 100vw;
    height: 100vh;
    padding: 30px;
    border: 8px solid red;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: 0;
    white-space: nowrap;
  }

  .list-container .lists {
    display: inline-block;
    height: 100%;
    border: 10px solid blue;
    box-sizing: border-box;
    font-size: 0;
    white-space: nowrap;
  }

  .list-container .lists .list {
    display: inline-block;
    width: 300px;
    height: 100%;
    border: 10px solid yellowgreen;
    box-sizing: border-box;
    font-size: 16px;
  }
  .list-container .create-list {
    display: inline-block;
    width: 300px;
    height: 50px;
    border: 10px solid yellowgreen;
    box-sizing: border-box;
    font-size: 16px;
    vertical-align: top;
  }
</style> -->
