import React, {useEffect, useState} from 'react'
import styles from '../../styles/components/Blog.module.scss'
import LandingNavbar from "@/components/LandingNavbar";
import fs from "fs";
import path from "path";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import matter, {Input} from "gray-matter";
import {CiTimer} from "react-icons/ci";
import {useRouter} from "next/router";

interface Slug {
    slugs: String[],
    markdownWithMetaData: String[]
}

export interface PostData {
    author: String,
    date: Date,
    description: String,
    label: String,
    postTitle: String,
    shortIntro: String,
    slug: String,
    title: String,
    minutes: number,
    tags: String
}

const Index = (props: Slug) => {

    const [tags, setTags] = useState<Set<string>>();
    const [currentTag, setCurrentTag] = useState<string>();
    const [currentPostData, setCurrentPostData] = useState<PostData[]>()

    const router = useRouter()

    const marked = props.markdownWithMetaData.map((item) => {
        return matter(item as Input);
    });
    const postData: PostData[] = marked.map(item => {
        return item.data as PostData
    })

    useEffect(() => {
        setCurrentPostData(postData)
        setTags(_curr => {
            return new Set(
                postData
                    .map(post => post.tags)
                    .map(tagsNotSeparated => tagsNotSeparated.split(", "))
                    .flat()
                    .concat(["All"])
            )}
        )
    }, []);


  return (
      <>
        <LandingNavbar/>
        <div className={styles.blog}>
            <div className={styles.left}>

            </div>
            <div className={styles.posts}>
                {currentPostData?.map(data => {
                    // @ts-ignore
                    return <div key={data} className={styles.post} onClick={() => {
                            router.push(`/blog/${data.slug}`)
                        }
                    }>
                        <div className={styles.postTitle}>{data.postTitle}</div>
                        <div className={styles.postShort}>{data.shortIntro}</div>
                        <div className={styles.info}>
                            <div className={styles.tag}>{data.tags}</div>
                            <div className={styles.minutes}><CiTimer className={styles.timer}/>{data.minutes} min</div>
                            <div className={styles.date}>{data.date.toString()}</div>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.right}>
                {tags && Array.from(tags).map(tag => {
                    return (
                        <div className={styles.tag} key={crypto.randomUUID()} onClick={() => {
                            setCurrentTag(tag)
                            tag == "All" ? setCurrentPostData(postData) :
                            setCurrentPostData(postData.filter(post => post.tags.includes(tag)))
                        }} >
                            {tag}
                        </div>
                    )
                })}
            </div>
        </div>
      </>
  )
}

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    //path.join - handles / and \ in the path
    // const markdownWithMetaData = fs
    //   .readFileSync(path.join("posts", slug + ".html"))
    //   .toString();
    // const parsedMarkdown = matter(markdownWithMetaData);
    const files = fs.readdirSync("posts");
    const paths = files.map((filename) => {
        return filename.replace(".md", "").replace(".html", "");
    }).filter(path => path != "img");

    const markdownWithMetaData = paths.map((filename) => {
        return fs.readFileSync(path.join("posts", filename + ".html")).toString();
    });
    return {
        props: {
            slugs: paths,
            markdownWithMetaData: markdownWithMetaData,
        },
    };
};