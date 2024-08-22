import{_ as a,o as l,c as e,U as i}from"./chunks/framework.1bc6aac7.js";const q=JSON.parse('{"title":"js 设计模式","description":"","frontmatter":{},"headers":[],"relativePath":"js/base/设计模式.md"}'),r={name:"js/base/设计模式.md"},o=i('<h1 id="js-设计模式" tabindex="-1">js 设计模式 <a class="header-anchor" href="#js-设计模式" aria-label="Permalink to &quot;js 设计模式&quot;">​</a></h1><p>主要分为 3 大类，创建类， 结构类，行为类。</p><h2 id="创建类" tabindex="-1">创建类 <a class="header-anchor" href="#创建类" aria-label="Permalink to &quot;创建类&quot;">​</a></h2><h3 id="_1-单例模式" tabindex="-1">1. 单例模式 <a class="header-anchor" href="#_1-单例模式" aria-label="Permalink to &quot;1. 单例模式&quot;">​</a></h3><p>全局只有一个实例，并提供一个全局访问点。由特定类，暴露获取实例方法，有这个实例则直接返回单例，没就先实例化。</p><h4 id="适用情况" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><p>全局需要供用一个访问点。</p><h4 id="运用" tabindex="-1">运用 <a class="header-anchor" href="#运用" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>vuex 插件的 install 方法</p><h4 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>节约资源</li><li>保证访问的一致性</li></ol><p>缺点：</p><ol><li>不好拓展，因为时自身内部实例化</li></ol><h3 id="_2-工厂模式" tabindex="-1">2. 工厂模式 <a class="header-anchor" href="#_2-工厂模式" aria-label="Permalink to &quot;2. 工厂模式&quot;">​</a></h3><p>根据不同参数返回不同类的实例，将对象的创建与对象的实现分离。实现复杂，但使用简单。工厂会给我们提供一个工厂方法，我们直接去调用即可</p><h4 id="适用情况-1" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况-1" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><p>当类中有一些通用处理，但所需的子类在运行时动态确定时才能确定时，我们可以用工厂方法模式</p><h4 id="运用-1" tabindex="-1">运用 <a class="header-anchor" href="#运用-1" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>js 的 Document.createElement</p><h4 id="优缺点-1" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-1" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>良好的封装，访问者无需关注创建过程，代码结构清晰</li><li>良好的拓展性，隔离了用户和创建流程，符合开闭原则</li><li>解耦了高层逻辑和底层产品类，符合最少知识原则</li><li>代码复用性好</li></ol><p>缺点:</p><ol><li>可能增加系统的复杂性：如果过度使用工厂模式，可能会导致系统中存在大量的工厂类，使得系统结构变得复杂，增加维护难度。</li><li>不利于继承：由于工厂模式创建的对象通常是匿名对象（即没有显式地使用类名来创建对象），因此这些对象通常无法直接参与继承关系。如果需要实现继承，可能需要额外的设计或转换工作。</li></ol><h3 id="_3-建造者模式" tabindex="-1">3. 建造者模式 <a class="header-anchor" href="#_3-建造者模式" aria-label="Permalink to &quot;3. 建造者模式&quot;">​</a></h3><h2 id="结构类" tabindex="-1">结构类 <a class="header-anchor" href="#结构类" aria-label="Permalink to &quot;结构类&quot;">​</a></h2><h3 id="_4-适配器模式" tabindex="-1">4. 适配器模式 <a class="header-anchor" href="#_4-适配器模式" aria-label="Permalink to &quot;4. 适配器模式&quot;">​</a></h3><p>用于解决兼容问题，接口/方法/数据不兼容，将其转换成访问者期望的格式进行使用。</p><h4 id="适用情况-2" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况-2" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><ol><li>使用一个已经存在的对象，但其方法或属性接口不符合你的要求。</li><li>你想创建一个可复用的对象，该对象可以与其它不相关的对象或不可见对象（即接口方法或属性不兼容的对象）协同工作。</li><li>想使用已经存在的对象，但是不能对每一个都进行原型继承以匹配它的接口。对象适配器可以适配它的父对象接口方法或属性。</li><li>需要一个统一的输出接口，但是输入类型却不可预知。</li></ol><h4 id="运用-2" tabindex="-1">运用 <a class="header-anchor" href="#运用-2" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>echarts 数据格式转换、时间格式转换</p><h4 id="优缺点-2" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-2" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>提高代码的复用性：适配器模式允许已有的接口与新的接口协同工作，无需修改已有代码，从而提高了代码的复用性。</li><li>更好的扩展性：通过使用适配器模式，我们可以更轻松地扩展系统的功能。例如，当需要添加新的功能，但现有的类无法满足需求时，可以通过适配器模式来扩展现有类的功能。</li><li>灵活性：适配器模式提供了一种灵活的方式来处理接口不兼容的问题。当系统的接口发生变化时，只需修改适配器，而无需修改其他类，从而降低了系统的耦合度。</li><li>符合开闭原则：开闭原则要求软件实体对扩展开放，对修改关闭。适配器模式通过扩展新的适配器类来满足新的需求，而无需修改已有的类，符合开闭原则。</li><li>客户端代码透明：客户端代码可以通过适配器来调用被适配者的方法，而无需知道被适配者的具体实现细节，这有助于降低客户端代码与被适配者之间的耦合度。</li></ol><p>缺点：</p><ol><li>可能增加代码的复杂性：引入适配器模式可能会增加系统的类数量，从而增加代码的复杂性。特别是在一个系统中存在多个需要适配的接口时，可能需要编写多个适配器类，这可能会使代码变得难以理解和维护。</li><li>可能降低系统的性能：适配器模式在运行时需要额外的对象和方法调用来完成适配工作，这可能会降低系统的性能。特别是在处理大量数据时，这种性能下降可能会更加明显。</li><li>可能增加系统的出错概率：由于适配器模式需要处理接口不匹配的问题，因此在编写适配器类时需要特别小心，以避免出现错误。如果适配器类编写不正确，可能会导致系统出现错误或异常。</li><li>可能使代码难以阅读和理解：由于适配器模式涉及到多个类和接口之间的交互，因此代码可能会变得复杂且难以理解。如果适配器类的设计不够清晰和简洁，可能会使其他开发人员难以理解和维护代码。</li></ol><h3 id="_5-装饰器模式" tabindex="-1">5. 装饰器模式 <a class="header-anchor" href="#_5-装饰器模式" aria-label="Permalink to &quot;5. 装饰器模式&quot;">​</a></h3><p>在不改变原对象的基础上，增加新属性/方法/功能。</p><h4 id="运用-3" tabindex="-1">运用 <a class="header-anchor" href="#运用-3" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>静态数据过滤，只保存动态数据。使用时添加静态数据</p><h4 id="优缺点-3" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-3" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>对象的核心职责和装饰功能区分开，可以通过动态增删装饰去除目标对象中的装饰逻辑。</li></ol><p>缺点：</p><ol><li>性能，需要操作数据对象</li></ol><h2 id="行为类" tabindex="-1">行为类 <a class="header-anchor" href="#行为类" aria-label="Permalink to &quot;行为类&quot;">​</a></h2><h3 id="_6-策略模式" tabindex="-1">6. 策略模式 <a class="header-anchor" href="#_6-策略模式" aria-label="Permalink to &quot;6. 策略模式&quot;">​</a></h3><p>定义一系列算法，根据输入的参数决定使用哪个算法</p><h4 id="适用情况-3" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况-3" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><ol><li>算法需要自由切换的场景。</li><li>多个算法只有行为上有些不同，可以考虑策略模式动态选择算法。</li><li>需要多重判断，可以考虑策略模式规避多重条件判断。</li></ol><h4 id="运用-4" tabindex="-1">运用 <a class="header-anchor" href="#运用-4" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>element 的表单验证，适用邮件还是电话等</p><h4 id="优缺点-4" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-4" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>策略相互独立，可以互相切换。提高了灵活性以及复用性。</li><li>不需要使用 if-else 进行策略选择，提高了维护性。</li><li>可扩展性好，满足开闭原则。</li></ol><p>缺点：</p><ol><li>策略相互独立，一些复杂的算法逻辑无法共享，造成资源浪费。</li><li>用户在使用策略时，需要了解具体的策略实现。不满足最少知识原则，增加了使用成本。</li></ol><h3 id="_7-观察者模式" tabindex="-1">7. 观察者模式 <a class="header-anchor" href="#_7-观察者模式" aria-label="Permalink to &quot;7. 观察者模式&quot;">​</a></h3><p>一个对象（称为 subject）维持一系列依赖于它的对象（称为 observer），将有关状态的任何变更自动通知给它们（观察者）。观察者必须订阅内容改变的事件，定义一对多的依赖关系。</p><h4 id="适用情况-4" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况-4" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><h4 id="运用-5" tabindex="-1">运用 <a class="header-anchor" href="#运用-5" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>DOM 事件监听，RxJS</p><h4 id="优缺点-5" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-5" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>目标变化就会通知观察者，这是观察者模式最大的优点。</li></ol><p>缺点：</p><ol><li>不灵活。目标和观察者是耦合在一起的，要实现观察者模式，必须同时引入被观察者和观察者才能达到响应式的效果。</li></ol><h3 id="_8-发布订阅模式" tabindex="-1">8. 发布订阅模式 <a class="header-anchor" href="#_8-发布订阅模式" aria-label="Permalink to &quot;8. 发布订阅模式&quot;">​</a></h3><p>观察者模式的变种，基于一个主题/事件通道，希望接收通知的对象（称为 subscriber）通过自定义事件订阅主题，被激活事件的对象（称为 publisher）通过发布主题事件的方式被通知。（有三方，事件通道、订阅者，发布者）</p><h4 id="适用情况-5" tabindex="-1">适用情况 <a class="header-anchor" href="#适用情况-5" aria-label="Permalink to &quot;适用情况&quot;">​</a></h4><h4 id="运用-6" tabindex="-1">运用 <a class="header-anchor" href="#运用-6" aria-label="Permalink to &quot;运用&quot;">​</a></h4><p>vue 双向绑定，data（发布者），setter（事件通道），watcher（订阅者）</p><h4 id="优缺点-6" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点-6" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><p>优点：</p><ol><li>时间解耦：注册的订阅行为由发布者决定何时调用，订阅者无需持续关注，由发布者负责通知。</li><li>对象解耦：发布者无需知道消息的接受者，只需遍历订阅该消息类型的订阅者发送消息，解耦了发布者和订阅者之间的联系，互不持有，都依赖于抽象。</li></ol><p>缺点：</p><ol><li>资源消耗：创建订阅者需要一定的时间和内存。</li><li>增加复杂度：弱化了联系，难以维护调用关系，增加了理解成本。</li></ol>',79),t=[o];function h(n,d,s,c,u,p){return l(),e("div",null,t)}const _=a(r,[["render",h]]);export{q as __pageData,_ as default};
