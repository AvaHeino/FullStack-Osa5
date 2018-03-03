let token = null

const blogs = [
  {
    id: "12345",
    title: "Kasvis Kingi!",
    author: "Miia Mauku",
    url: "www.kasviskingi.fi",
    likes: 14, 
    user: {
      id: "abcd123"
    }
  },
  {
    id: "678910",
    title: "Iania kasitoita",
    author: "Milla Sammal",
    url: "www.millavirkkaa.fi",
    likes: 11,
    user: {
      id: "abcd123",
    }
  },
  {
    id: "1112131415",
    title: "Opetellaan ranskaa",
    author: "Juliette Paris",
    url: "www.opiranskaa.org",
    likes: 90,
    user: {
      id: "efg456",
    }
  }
]



const getAll = () => {
  return Promise.resolve(blogs)
}



export default { getAll, blogs }