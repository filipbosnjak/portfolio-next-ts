import React from 'react'
import LandingNavbar from "@/components/LandingNavbar";
import styles from '../../styles/components/Post.module.scss'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {PostData} from "@/pages/blog/index";
import {CiTimer} from "react-icons/ci";

interface PostProps {
    content: String,
    data: PostData,
    html: String,
    allPostsData: PostData[],
}

const Post = (props: PostProps) => {
    return (
      <>
          <LandingNavbar/>
          <div className={styles.post}>
              <div className={styles.text}>
                  <div className={styles.title}>{props.data.title}</div>
                  <div className={styles.info}>
                      <div className={styles.author}>Author: {props.data.author}</div>
                      <div className={styles.date}>Date: {props.data.date.toString()}</div>
                      <div className={styles.date}><CiTimer/>{props.data.minutes} min</div>
                  </div>
                  <div className={styles.content} dangerouslySetInnerHTML={{__html: props.content.toString()}}>{}</div>
              </div>
          </div>
      </>
  )
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync("posts");

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".md", "").replace(".html", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
};

//Function returning props to the post component - data feeding
export const getStaticProps = async ({ params: { slug } } : {params: {slug: string}}) => {

    //Getting info about all the files
    const files = fs.readdirSync("posts");
    const paths = files.map((filename) => {
        return filename.replace(".md", "").replace(".html", "");
    }).filter(path => path != 'img');


    const markdownWithMetaDataAll = paths.map((filename) => {
        return fs.readFileSync(path.join("posts", filename + ".html")).toString();
    });
    const markedAllData = markdownWithMetaDataAll.map((item) => {
        const newMarked: matter.GrayMatterFile<string> = matter(item);
        return newMarked.data;
    });

    //path.join - handles / and \ in the path
    const markdownWithMetaData = fs
        .readFileSync(path.join("posts", slug + ".html"))
        .toString();
    const parsedMarkdown = matter(markdownWithMetaData);
    return {
        props: {
            content: parsedMarkdown.content,
            data: parsedMarkdown.data,
            html: markdownWithMetaData,
            allPostsData: markedAllData,
        },
    };
};



export default Post;