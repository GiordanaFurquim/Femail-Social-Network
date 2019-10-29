import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function FindCollaborator({ history }) {
    const [selectedSkills, setSellectedSkills] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [skill, setSkill] = useState("");

    const [selectedSkills2, setSellectedSkills2] = useState([]);
    const [userSearch2, setUserSearch2] = useState("");
    const [skill2, setSkill2] = useState("");

    const [selectedSkills3, setSellectedSkills3] = useState([]);
    const [userSearch3, setUserSearch3] = useState("");
    const [skill3, setSkill3] = useState("");

    const [selectedSkills4, setSellectedSkills4] = useState([]);
    const [userSearch4, setUserSearch4] = useState("");
    const [skill4, setSkill4] = useState("");

    const [selectedSkills5, setSellectedSkills5] = useState([]);
    const [userSearch5, setUserSearch5] = useState("");
    const [skill5, setSkill5] = useState("");

    const [learn, setLearn] = useState("");
    const [learn2, setLearn2] = useState("");
    const [learn3, setLearn3] = useState("");
    const [learn4, setLearn4] = useState("");
    const [learn5, setLearn5] = useState("");

    const [level, setLevel] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [level5, setLevel5] = useState("");

    let skills = [
        "plumbing",
        "python",
        "javascript",
        "ruby on rails",
        "first aid",
        "cooking",
        "household economics",
        "house organization",
        "excel",
        "car maintenance",
        "cleaning",
        "sewing",
        "home repairs",
        "writing",
        "public speaking",
        "basic computer skills",
        "writing resume",
        "writing cover letter",
        "basic math",
        "basic etiquette",
        "basic civis",
        "coaching",
        "german",
        "english",
        "spanish",
        "italian",
        "chinese",
        "french",
        "japonese",
        "portuguese",
        "digital photography",
        "web analytics",
        "digital media",
        "video creation",
        "database management",
        "software development",
        "hand craft",
        "carpentry",
        "basic accounting",
        "artificial intelligence",
        "machine learning",
        "cyber security",
        "block chain technology",
        "data science",
        "cloud computing",
        "digital marketing",
        "pandas",
        "numpy",
        "sql",
        "career path",
        "photography",
        "video editing",
        "wombats",
        "color grading",
        "bike repair",
        "swimming",
        "hair styling",
        "pedicure",
        "manicure",
        "makeup",
        "networking",
        "jewelry making",
        "self defense",
        "calligraphy",
        "photoshop",
        "soap making",
        "project management",
        "powerpoint",
        "innovation management",
        "consulting",
        "assessment centers",
        "design thinking",
        "sailing",
        "canoeing",
        "kayaking",
        "typing",
        "tattooing",
        "guitar",
        "piano",
        "violin",
        "harp",
        "keyboard",
        "coding",
        "reading",
        "poetry",
        "baking",
        "beer brewing",
        "coffee brewing",
        "drawing",
        "design",
        "mechanics",
        "engineering",
        "astrology",
        "psicology",
        "meteorology",
        "babysitting",
        "petsitting",
        "travel planning",
        "web development",
        "neating",
        "crochet",
        "construction",
        "negotiating techniques",
        "global politics",
        "finance",
        "audio engineering",
        "yoga",
        "filmmaking",
        "women rights",
        "history",
        "biology",
        "math",
        "satistics",
        "law",
        "linguistics",
        "religion",
        "planting",
        "gardening",
        "meditation",
        "blow bubbles",
        "Hula-Hoop",
        "Moonwalk",
        "Whistle",
        "tell stories",
        "pick a lock",
        "tie a tie",
        "juggle"
    ];
    let skills2 = [...skills];
    let skills3 = [...skills];
    let skills4 = [...skills];
    let skills5 = [...skills];

    skills = skills.filter(skill => skill.startsWith(userSearch));

    skills2 = skills2.filter(skill => skill.startsWith(userSearch2));

    skills3 = skills3.filter(skill => skill.startsWith(userSearch3));

    skills4 = skills4.filter(skill => skill.startsWith(userSearch4));

    skills5 = skills5.filter(skill => skill.startsWith(userSearch5));

    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleClick = skill => {
        setUserSearch(skill);
    };

    const handleClick2 = skill2 => {
        setUserSearch2(skill2);
    };
    const handleClick3 = skill3 => {
        setUserSearch3(skill3);
    };
    const handleClick4 = skill4 => {
        setUserSearch4(skill4);
    };
    const handleClick5 = skill5 => {
        setUserSearch5(skill5);
    };

    const submitButton = e => {
        e.preventDefault();
        axios
            .post("/colabinformation", {
                learn,
                learn2,
                learn3,
                learn4,
                learn5,
                userSearch,
                userSearch2,
                userSearch3,
                userSearch4,
                userSearch5,
                level,
                level2,
                level3,
                level4,
                level5
            })
            .then(res => {
                console.log("RES:", res);
                if (res.data.success) {
                    history.push("/recomender/best-matches");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log("Error on POST /recomender/best-matches:", error);
            });
    };


    return (
        <div className="find-collaborator-container">
            <div className="collaborator-profile">
                <div className="step-by-step">
                    <p>
                        <h2>
                            What&apos;s the deal with this collaborator thing?
                        </h2>
                        Hey, girl! Have you always wanted to learn how to play
                        the piano, fly a plane or write some badass codes?
                        We&apos;re sure you&apos;ll find a collaborator who can
                        teach you how to do so. Or how about being the woman who
                        will teach someone how to play football, do push-ups and
                        fix the engine of a Dodge Power Wagon?{" "}
                    </p>
                    <p>
                        This is a space for you to explore your potential, learn
                        new things and teach as well. Feel free to connect with
                        women who match your profile and can be incredible
                        partners in this journey of empowerment and personal
                        development. Let&apos;s get it started!
                        <p />
                        <h2>step by step to find the perfect collaborator:</h2>
                        Step 1. look for what you&apos;d like to learn/teach in
                        the skills input field (e.g. Skill One)
                        <br />
                        Step 2. evaluate your level in each of the chosen skills
                        and rate each of them from 1 to 5, being 1 for beginner
                        and 5 for experienced.
                        <br />
                        Step 3. Choose whether you&apos;d like to teach or learn
                        each of the selected skills.
                        <br />
                        Step 4. Choose at least one skill and at most five.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="questions-form">
                    <div className="form-block-one">
                        <div className="skill-one-container">
                            <label htmlFor="skill1">Skill One</label>

                            <input
                                onChange={e => setUserSearch(e.target.value)}
                                placeholder="search skill one"
                                value={userSearch}
                                name="skill1"
                            />
                            {userSearch && (
                                <div>
                                    {skills.map((skill, index) => (
                                        <div
                                            className="select-skill-one"
                                            key={index}
                                            onClick={e => handleClick(skill, e)}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label htmlFor="rating1">
                                From 0 to 5, how would you rate your{" "}
                                {userSearch} skills?
                            </label>

                            <select
                                name="rating1"
                                onChange={e => setLevel(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Rate your skills
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <label htmlFor="status1">
                                Would you like to teach or learn {userSearch}?
                            </label>
                            <select
                                name="status1"
                                onChange={e => setLearn(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Choose an option
                                </option>
                                <option value="learn">Learn</option>
                                <option value="teach">Teach</option>
                            </select>
                        </div>
                        <div className="skill-two-container">
                            <label htmlFor="skill2">Skill Two</label>
                            <input
                                onChange={e => setUserSearch2(e.target.value)}
                                placeholder="search skill two"
                                value={userSearch2}
                                name="skill2"
                            />
                            {userSearch2 && (
                                <div>
                                    {skills2.map((skill, index) => (
                                        <div
                                            className="select-skill-one"
                                            key={index}
                                            onClick={e =>
                                                handleClick2(skill, e)
                                            }
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label htmlFor="rating2">
                                From 0 to 5, how would you rate your{" "}
                                {userSearch2} skills?
                            </label>
                            <select
                                name="rating2"
                                onChange={e => setLevel2(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Rate your skills
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <label htmlFor="status2">
                                Would you like to teach or learn {userSearch2}?
                            </label>
                            <select
                                name="status2"
                                onChange={e => setLearn2(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Choose an option
                                </option>
                                <option value="learn">Learn</option>
                                <option value="teach">Teach</option>
                            </select>
                        </div>

                        <div className="skill-three-container">
                            <label htmlFor="skill3">Skill Three</label>
                            <input
                                onChange={e => setUserSearch3(e.target.value)}
                                placeholder="search skill three"
                                value={userSearch3}
                                name="skill3"
                            />
                            {userSearch3 && (
                                <div>
                                    {skills3.map((skill, index) => (
                                        <div
                                            className="select-skill-one"
                                            key={index}
                                            onClick={e =>
                                                handleClick3(skill, e)
                                            }
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label htmlFor="rating3">
                                From 0 to 5, how would you rate your{" "}
                                {userSearch3} skills?
                            </label>
                            <select
                                name="rating3"
                                onChange={e => setLevel3(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Rate your skills
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <label htmlFor="status3">
                                Would you like to teach or learn {userSearch3}?
                            </label>
                            <select
                                name="status3"
                                onChange={e => setLearn3(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Choose an option
                                </option>
                                <option value="learn">Learn</option>
                                <option value="teach">Teach</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-block-two">
                        <div className="skill-four-container">
                            <label htmlFor="skill4">Skill Four</label>
                            <input
                                onChange={e => setUserSearch4(e.target.value)}
                                placeholder="search skill four"
                                value={userSearch4}
                                name="skill4"
                            />
                            {userSearch4 && (
                                <div>
                                    {skills4.map((skill, index) => (
                                        <div
                                            className="select-skill-one"
                                            key={index}
                                            onClick={e =>
                                                handleClick4(skill, e)
                                            }
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label htmlFor="rating4">
                                From 0 to 5, how would you rate your{" "}
                                {userSearch4} skills?
                            </label>
                            <select
                                name="rating4"
                                onChange={e => setLevel4(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Rate your skills
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <label htmlFor="status4">
                                Would you like to teach or learn {userSearch4}?
                            </label>
                            <select
                                name="status4"
                                onChange={e => setLearn4(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Choose an option
                                </option>
                                <option value="learn">Learn</option>
                                <option value="teach">Teach</option>
                            </select>
                        </div>

                        <div className="skill-five-container">
                            <label htmlFor="skill5">Skill Five</label>
                            <input
                                onChange={e => setUserSearch5(e.target.value)}
                                placeholder="search skill five"
                                value={userSearch5}
                                name="skill5"
                            />
                            {userSearch5 && (
                                <div>
                                    {skills5.map((skill, index) => (
                                        <div
                                            className="select-skill-five"
                                            key={index}
                                            onClick={e =>
                                                handleClick5(skill, e)
                                            }
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label htmlFor="rating5">
                                From 0 to 5, how would you rate your{" "}
                                {userSearch5} skills?
                            </label>
                            <select
                                name="rating5"
                                onChange={e => setLevel5(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Rate your skills
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <label htmlFor="status5">
                                Would you like to teach or learn {userSearch5}?
                            </label>
                            <select
                                name="status5"
                                onChange={e => setLearn5(e.target.value)}
                            >
                                <option value="selected disabled hidden">
                                    Choose an option
                                </option>
                                <option value="learn">Learn</option>
                                <option value="teach">Teach</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="find-collaborator-button"
                        onClick={submitButton}
                    >
                        Submit Preferences
                    </button>
                </form>
            </div>
        </div>
    );
}
