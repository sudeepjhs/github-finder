/**
 * @param {{login: "",id: "",node_id: "",avatar_url: "",gravatar_id: "",url: "",html_url: "",followers_url: "",following_url: "",gists_url: "",starred_url: "",subscriptions_url: "",organizations_url: "",repos_url: "",events_url: "",received_events_url: "",type: "",site_admin: false,name: "",company: "",blog: "",location: "",email: "",hireable: "",bio: "",twitter_username: "",public_repos: "",public_gists: "",followers: "",following: "",created_at: "",updated_at: ""}} user
 * @returns {HTMLElement}
 */
const createCard = (user) => {
  const template = document.getElementById("github-card");
  const importEle = document.importNode(template.content, true);
  const card = importEle.firstElementChild;
  card.querySelector("img").src = user.avatar_url;
  card.querySelector(".username").textContent = user.name;
  card.querySelector(".bio p").textContent = user.bio ?? "Not Avaliable";
  card.querySelector(".bio .followers > span").textContent =
    user.followers ?? "Not Avaliable";
  card.querySelector(".bio .following > span").textContent =
    user.following ?? "Not Avaliable";
  card.querySelector(".bio .twitter > span").textContent =
    user.twitter_username ?? "Not Avaliable";
  card.querySelector(".bio .repos > span").textContent =
    user.public_repos ?? "Not Avaliable";
  card.querySelector(".bio .location > span").textContent =
    user.location ?? "Not Avaliable";
  return card;
};

/**
 * @param {string} username
 */
const fetchUserDetail = (username) => {
    const res =  fetch(`https://api.github.com/users/${username}`).then((res)=>{
      if (res.ok) return res.json()
      else throw new Error(`Username ${username} not found`)
    }).then((data)=>{
        const card = createCard(data);
    const main = document.getElementById("main");
    main.innerHTML = ``;
    main.insertAdjacentElement("afterbegin", card);
    }).catch((err)=>{
       alert(err.message)
    })
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("search").value;
    fetchUserDetail(username);
  });
});
