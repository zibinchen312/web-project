import React, { JSX, useState, useEffect } from 'react';
import "./articles.scss"

import article1img from "/assets/article1.jpg";
import article2img from "/assets/article2.jpg";
import article3img from "/assets/article3.jpg";
import article4img from "/assets/article4.jpg";

type Article = {
    id: number;
    title: string;
    content: JSX.Element;
}

const articles: Article[] = [
    {
        id: 1,
        title: "使徒行传4:1-2",
        content: (
            <div className="article-content">
                <img src={article1img} alt="Article Image" className="img-fluid"/>
                <p>
                <br/>
                【使徒行传4:1-2】使徒对百姓说话的时候，祭司们和守殿官，并撒都该人忽然来了。因他们教训百姓，本着耶稣，传说死人复活，就很烦恼,
                <br/><br/>
                    祭司和守殿官并撒都该人这些宗教人士很烦恼，因为使徒们传讲一件事，也是我们最核心的信息:死人复活。复活不仅仅是我们的身体要改变形状，我们天然的人的魂，也要改变。
                <br/><br/>
                    天然的人可以做很多事，与属灵的人似乎很像。比如天然的人有怜悯心。甚至天然的人也会用力去爱，用力去信，甚至努力地服事，好像都能靠着自己的能力做出一点。但是换一个环境，换一个对象，就做不出来了。尽管人的魂里有许多的能力，有怜悯包容、忍耐和爱心，但这一切，有一日也会褪色失去。
                <br/><br/>
                    一个属灵的人，他有属灵的恩慈与怜悯，属灵的忍耐，是存到永远的。他不觉得在忍耐，甚至他没有在忍耐，而是自自然然活出了属天的生命。
                <br/><br/>
                    复活，不仅仅是到那日我们都活过来了，而是根据我们今生在基督里的经营，魂有多少被灵化，被改变，来决定我们这一生的奖赏有多少。
                <br/><br/>
                    我们要知道，我们信仰的根基在乎耶稣基督复活了。如果没有这一个事实，基督徒的人生，圣经里的应许，就不过是一个很好的理一个很好的传说而已，很可惜，仅仅理念，念并不能真的改变人。只有叫死人复活者的灵，才可以!
                <br/><br/>
                    彼得在这里并不是说每一个人都要“死”，都要“复活”。他是对我们这些在基督里的人凡听见这信心之话并接受的人说:我们都要被改变，叫我们得以有真正属天生命的成长。
                <br/><br/>
                    彼得很清楚这要命之处，所以他传讲的时候直指信自的核心:死人复活江タ犬这对宁教人士来说，是极为厌烦的，甚至他们要把使徒们抓住，就和抓拿耶稣的时候一模一样。但是对于那些听到这话的人，在他们心里就产生了反应，并且结出果子来，影响是非常深远的。第一次听见死人复活这话而得救的人，约有三千;这二次听见得救的，约有五千。
                </p>
            </div>
        ),
    },
    {
        id: 2,
        title: "使徒行传3:14-16",
        content: (
            <div className="article-content">
                <img src={article2img} alt="Article Image" className="img-fluid"/>
                <p>
                <br/>
                【使徒行传3:14-16】你们弃绝了那圣洁公义者，反求着释放一个凶手给你们。你们杀了那生命的主，神却叫他从死里复活了;我们都是为这事作见证。我们因信他的名，他的名便叫你们所看见所认识的这人健壮了;正是他所赐的信心，叫这人在你们众人面前全然好了。
                <br/><br/>
                彼得因主的名，叫瘸子起来行走，跑着、跳着、赞美主。这个信心很厉害。对耶稣基督名的信心，就可以取用圣灵的能力，这绝对不是只靠喊一喊主耶稣的名字，而是彼得对主耶稣的名有极深的经历和把握。
                <br/><br/>
                如果我们有这样的信，也必然有相应的经历和能力。如果没有，就要承认，我們真像彼得对以色列人所说的:“你们太悖逆了，你们是弃绝主的人。”你跟主的关系不像你所表现的那样，你可能很爱主，但不小心都是为自己。
                <br/><br/>
                以色列人为着自己，宁可求罗马总督彼拉多释放最厌恶的凶手，也要把这位圣洁公义的主钉死在一字架上。彼得来面对这样的情形，他单单倚靠对耶稣基督之名的信心和把握，圣灵把能力加在他身上，医治了这个瘸子，在众人面前显了主耶稣死而复活之后的第一个神迹。
                <br/><br/>
                如果我们以为:我们是服侍主的，我们和主的关系很近，我们可以做很多，那么我们就不会有能力。因为真实的能力在于我们属灵上有一种的落差--属灵上我们多么认识自己的无用，以及看见在耶稣基督里那无穷生命的大能。
                <br/><br/>
                从心深处，我们要认识:主啊，我承认我是个悖逆的人，需要彼得这样的弟兄和先知们来提醒。主啊，我是一个弃绝祢、杀害祢的
                <br/><br/>
                求主把这样的认识赐给我们。另一面，当我们传褔音时候，不要害怕直指人真实的光景。并且我们要学习彼得的心态:我和你们切里我不认口没位又法八V的士千一样会弃绝、杀害这位主。但是，因为我蒙了何等的怜悯，如今我认识祂、悔改转向祂，我就相信你们中间凡听见这话就回转的人，也能跟我一样得着拯救。
                </p>
            </div>
        ),
    },
    {
        id: 3,
        title: "使徒行传3:7-8",
        content: (
            <div className="article-content">
                <img src={article4img} alt="Article Image" className="img-fluid"/>
                <p>
                <br/>
                【使徒行传3:7-8】于是拉着他的右手，扶他起来;他的脚和踝子骨立刻健壮了，就跳起来，站着，又行走，同他们进了殿，走着，跳着，赞美 神。
                <br/><br/>
                主耶稣升天以后，门徒行的第一个神迹，是面对一个生来瘸腿的人。生来有缺陷的人--生来脾气很差，生来个性懦弱，人有这样那样生来的缺陷，到底人过得是什么样的日子?看见这些，人里面会有许多感慨，可想而知，第一个神迹带给当时的人多大的震撼。
                <br/><br/>
                这人生来瘸腿，已经活到四十多岁了。在这里，圣灵印证彼得的信心，叫他立刻健壮起这就是彼得的信心所带来的能力来
                <br/><br/>
                属灵上，人都是“瘸子”。用属灵的寓意来说，腿预表一个人的意志。如同罗马书所描述的:“立志为善由得我，只是行出来由不得我”(罗7:18)。我们想做的事总没有能力，不想做的事却到处奔跑。
                <br/><br/>
                这人是肉身的生来腿瘸;那人可能是脑子的推理缺少了什么;有人说我的人际关系总是出问题，我们都需要主的拯救和医治。那时的瘸子如何奉主的名得着医治，说出圣灵有这个能力，关键在于我们今天对主的把握和信心。
                <br/><br/>
                多少人从罪恶、痛苦和辖制里被改变，起来跑着跳着赞美神。当我们经历许多这样的神迹以后，我们再遇见生来有缺欠的人，就没有什么好怕的。虽然我没有能力，但我所传的这位耶稣，他有能力可以改变你，改变我们。
                <br/><br/>
                有人说:我认识我自己，我对自己一点办法都没有，我绝对无法改变。不!一个有信心认识主的人，主绝对可以医治你，改变你!
                </p>
            </div>
        ),
    },
    {
        id: 4,
        title: "使徒行传3:1",
        content: (
            <div className="article-content">
                <img src={article3img} alt="Article Image" className="img-fluid"/>
                <p>
                <br/>
                【使徒行传3:1】申初祷告的时候，彼得、约翰上圣殿去。
                <br/><br/>
                “申初祷告”说到他们在下午三点时祷告。起头学习属灵的事，我们若没有定时祷告，事实上就没有祷告。虽然号称基督徒，实际上没有取用到基督徒的实质。很可惜。活着，却好像没有主。
                <br/><br/>
                不要小看这里，他们有定时祷告，而且是去圣殿祷告。当我们知道每周什么时候，在哪个地方，有一个定时祷告，这很宝贵。你不要以为这是一个宗教的实行。事实上，你在过程中有主，祷告中有主，这是极其宝贵的。
                <br/><br/>
                年幼时，律法是训蒙的老师(加3:24)。你把自己摆在一个规律之下一段时间，比如有固定时间的祷告。我上班的时候，定好时间我就一定会祷告。我找一个很安静的地方。主耶稣说祷告一定要把门关上。年幼时，我做不到不被事物打扰。我就去到洗手间，把小门关上，至少那一刻没有人打扰我学习祷告。
                <br/><br/>
                使徒们先要被圣灵充满，而且要照着他们所领会的，去过他们基督徒的生活。该祷告的时候，要祷告;该到圣殿祷告，就到圣殿祷告。这样你才能有圣灵的能力，应验主耶稣所说的话:能力要降在你们身上(徒1:8)
                <br/><br/>
                我们总要配合主，不把这些当做一个宗教的义务。不从人领受，要从神领受。
                </p>
            </div>
        ),
    },
];

const ArticlesModal: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const closeModal = () => setSelectedArticle(null);

    useEffect(() => {
        if (selectedArticle) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [selectedArticle]);

    return (
        <div className="container py-5" id="articles-modal">

            <h2 className="mb-4 text-center fw-bolder">文章目录</h2>
            <ul className="list-group">

                {articles.map((article) => (
                    <li key={article.id} className="list-group-item list-group-item-action">
                        <button 
                            onClick={() => setSelectedArticle(article)}
                            className="article-button btn btn-link text-start text-decoration-none w-100"
                        >
                            
                            {article.title}
                        </button>
                    </li>
                ))}

            </ul>

            {/* Modal */}
            {selectedArticle && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedArticle.title}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                {selectedArticle.content}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={closeModal}>
                                关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const Articles: React.FC = (): JSX.Element => {

    useEffect(() => {
        const interval = setInterval(() => {
            const topnav = document.getElementById("nav-title");
            const home = document.getElementById("articles-modal");
    
            if (topnav && home) {
                const navHeight = topnav.offsetHeight;  // Get the height of the navbar
                home.style.marginTop = `${navHeight + 20}px`;    // Set the margin-top of home to the height of navbar
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <ArticlesModal/>
        </>
    );
};

export default Articles;