## 此项目作为react学习过程的记录

[Demo](https://snakeninja110.github.io/react-todo/build/index.html)

### 2018.4.08  第三版(事件总线模式)
用事件总线模式分割开3个模块

3个子组件中数据独立处理

Header中做input提交到父组件，然后在main中接收

App.js只做事件转发：

```javascript
render() {
  return (
    <section className="todoapp">
      <Header eventEmitter={eventEmitter} />
      <Main eventEmitter={eventEmitter} />
      <Footer eventEmitter={eventEmitter}/>
    </section>
  );
}
```



Header.js：

```javascript
handleInput = (value) => {
  // 转发事件
  this.props.eventEmitter.emit('inputAdd', value);
}

handleKeyDown(e) {
  if (e.keyCode !== 13) {
      return;
   }
  e.preventDefault();

  let val = this.inputText.value
  if (val) {
    this.handleInput(val);
    this.inputText.value = '';
  }
}

render () {
  return (
    <div>
      <header className="header">
        // 省略...
        <input
          ref={(el) => { this.inputText = el }}
          onKeyDown = {this.handleKeyDown}
        />
      </header>
    </div>
  )
}
```



main.js：

```javascript
componentDidMount () {
  // 挂载完成后接受事件监听
  this.props.eventEmitter.on('inputAdd', (inputVal) => {
    const _todos = addTodo(this.state.todos, inputVal);
    this.updateTodo(_todos);
  });

  this.props.eventEmitter.on('nowShowing', (showType) => {
    this.handelNowShowing(showType);
  });

  this.props.eventEmitter.on('clearCompleted', () => {
    this.onClearCompleted();
  });
}
```




### 2018.3.31 第二版本(暂时搁置)
*先做事件总线模式，此优化暂时搁置*

上一版中我在Main.js，Footer.js中做了组件内容显示与否的判断，此时即使没有数据依然会渲染组件，并且组件不会被卸载 导致componentWillUnmount无法被触发

Main.js:

```javascript
export default class Main extends Component {

  componentWillUnmount() {
    // 无法被触发
  }
  render () {
    const todos = this.props.todos;
    const nowShowing = this.props.nowShowing;
    let main = null;
      
    if (todos.length) {
      main = (
        <section className='main' >
          <!-- 组件内容 -->
        </section>
      )
    }

    return (main)
  }
```

改版后把判断放入App.js内，Main 和 Footer 中正常渲染组件内容，这样当没有数据时Main，Footer能被正确卸载掉

```javascript
class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos",
      todos: Toolkit.util.store(_NAME_)
    };
  }

  render () {
	let main = null, footer = null;

    if (this.state.todos.length) {
      main = (
        <Main />
      );

      footer = (
        <Footer />
      )
    }

    return (
      <section className="todoapp">
        <Header />
        {main}
        {footer}
      </section>
    );
  }
}
```



### 2018.3.24 第一版完成

简单的父子组件传值操作，所有操作都由子组件或孙组件一级级往上传到App.js内进行数据操作，然后再向下分发进行渲染






This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

---



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

Also note that using some newer syntax features like `for...of` or `[...nonArrayValue]` causes Babel to emit code that depends on ES6 runtime features and might not work without a polyfill. When in doubt, use [Babel REPL](https://babeljs.io/repl/) to see what any specific syntax compiles down to.



### [GitHub Pages](https://pages.github.com/)

>Note: this feature is available with `react-scripts@0.2.0` and higher.

#### Step 1: Add `homepage` to `package.json`

**The step below is important!**<br>
**If you skip it, your app will not deploy correctly.**

Open your `package.json` and add a `homepage` field for your project:

```json
  "homepage": "https://myusername.github.io/my-app",
```

or for a GitHub user page:

```json
  "homepage": "https://myusername.github.io",
```

Create React App uses the `homepage` field to determine the root URL in the built HTML file.

#### Step 2: Install `gh-pages` and add `deploy` to `scripts` in `package.json`

Now, whenever you run `npm run build`, you will see a cheat sheet with instructions on how to deploy to GitHub Pages.

To publish it at [https://myusername.github.io/my-app](https://myusername.github.io/my-app), run:

```sh
npm install --save gh-pages
```

Alternatively you may use `yarn`:

```sh
yarn add gh-pages
```

Add the following scripts in your `package.json`:

```diff
  "scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

The `predeploy` script will run automatically before `deploy` is run.

If you are deploying to a GitHub user page instead of a project page you'll need to make two
additional modifications:

1. First, change your repository's source branch to be any branch other than **master**.
1. Additionally, tweak your `package.json` scripts to push deployments to **master**:
```diff
  "scripts": {
    "predeploy": "npm run build",
-   "deploy": "gh-pages -d build",
+   "deploy": "gh-pages -b master -d build",
```

#### Step 3: Deploy the site by running `npm run deploy`

Then run:

```sh
npm run deploy
```

#### Step 4: Ensure your project’s settings use `gh-pages`

Finally, make sure **GitHub Pages** option in your GitHub project settings is set to use the `gh-pages` branch:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">

#### Step 5: Optionally, configure the domain

You can configure a custom domain with GitHub Pages by adding a `CNAME` file to the `public/` folder.

#### Notes on client-side routing

GitHub Pages doesn’t support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`). This is because when there is a fresh page load for a url like `http://user.github.io/todomvc/todos/42`, where `/todos/42` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/todos/42`. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:

* You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to `hashHistory` for this effect, but the URL will be longer and more verbose (for example, `http://user.github.io/todomvc/#/todos/42?_k=yknaj`). [Read more](https://reacttraining.com/react-router/web/api/Router) about different history implementations in React Router.
* Alternatively, you can use a trick to teach GitHub Pages to handle 404 by redirecting to your `index.html` page with a special redirect parameter. You would need to add a `404.html` file with the redirection code to the `build` folder before deploying your project, and you’ll need to add code handling the redirect parameter to `index.html`. You can find a detailed explanation of this technique [in this guide](https://github.com/rafrex/spa-github-pages).



## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/facebookincubator/create-react-app/issues) or [contribute some!](https://github.com/facebookincubator/create-react-app/edit/master/packages/react-scripts/template/README.md)
