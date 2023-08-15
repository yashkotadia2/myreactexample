import '../style_sheet/styles.css';


export default function Home(props)
{    
    return(
    <>
  {/*       <div class="container">
            <div class="theme-switch">
                <div class="switch"></div>
            </div>
            <div class="navigation">
                <ul>
                <a href="http://www.sashatran.com/" class="active" target="_blank">Home</a>
                <a href="https://codepen.io/sashatran/" target="_blank">About</a>
                <a href="https://instagram.com/sasha.codes/" target="_blank">Instagram</a>
                <a href="https://twitter.com/sa_sha26" target="_blank">Twitter</a>
                </ul>
            </div>
        </div> */}
        <main>
            <div className="intro">
                <h1>A Web Developer</h1>
                <p>I am a web developer and I love to create websites.</p>
                <button className='intro-btn'>Learn More</button>
            </div>
            <div className="achievements row p-3">
                <div className="work col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <p className="work-heading">Projects</p>
                    <p className="work-text">I have worked on many projects and I am very proud of them. I am a very good developer and I am always looking for new projects.</p>
                </div>
                <div className="work col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <p className="work-heading">Skills</p>
                    <p className="work-text">I have a lot of skills and I am very good at them. I am very good at programming and I am always looking for new skills.</p>
                </div>
                <div className="work col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <p className="work-heading">Network</p>
                    <p className="work-text">I have a lot of network skills and I am very good at them. I am very good at networking and I am always looking for new network skills.</p>
                </div>
            </div>
        </main>
    </>
    );
}