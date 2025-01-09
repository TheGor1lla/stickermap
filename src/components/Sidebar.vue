<template>
  <div id="sidebar">
    <div id="sidebar-wrap">
      <ul class="key">
        <li><i class="graffiti"></i>
          <div>Graffiti</div>
        </li>
        <li><i class="sticker"></i>
          <div>Sticker</div>
        </li>
      </ul>
      <ul class="key controls">
        <li id="show-all"><i class="fa fa-eye"></i>
          <div data-i18n="controls.show">Show All</div>
        </li>
        <li id="hide-all"><i class="fa fa-eye-slash"></i>
          <div data-i18n="controls.hide">Hide All</div>
        </li>
        <li id="show-counts"><i class="fa fa-check-square"></i>
          <div data-i18n="controls.showCounts">Show Counts</div>
        </li>
        <li id="hide-counts"><i class="fa fa-square"></i>
          <div data-i18n="controls.hideCounts">Hide Counts</div>
        </li>
      </ul>
    </div>
  </div>
  <div id="sidebar-border"></div>
  <div id="hide-sidebar"></div>
  <div id="warn" data-i18n="misc.portraitWarn"></div>
  <div id="info-wrap">
    <div id="info-fade-intro"></div>
    <div id="info"></div>
    <div id="info-fade-outro"></div>
  </div>
</template>

<script>
  import '/public/main2.css'
  export default {
    name: "sidebar"
  }
</script>

<style>
</style>
