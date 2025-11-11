#!/usr/bin/env python3
import wave
import sys
import os
import json

def split_wav(input_path, out_dir):
    with wave.open(input_path,'rb') as wf:
        n_channels=wf.getnchannels()
        sampwidth=wf.getsampwidth()
        fr=wf.getframerate()
        nframes=wf.getnframes()
        duration=nframes/fr
        # default segments (seconds)
        segments=[('intro',0,min(15,duration)),
                  ('build_up',min(15,duration),min(45,duration)),
                  ('climax',min(45,duration),min(75,duration)),
                  ('outro',min(75,duration),duration)]
        os.makedirs(out_dir,exist_ok=True)
        out_files=[]
        for name,start,end in segments:
            if end-start<=0: continue
            start_frame=int(start*fr)
            end_frame=int(end*fr)
            wf.setpos(start_frame)
            frames=wf.readframes(end_frame-start_frame)
            out_path=os.path.join(out_dir,f"{name}.wav")
            with wave.open(out_path,'wb') as outw:
                outw.setnchannels(n_channels)
                outw.setsampwidth(sampwidth)
                outw.setframerate(fr)
                outw.writeframes(frames)
            out_files.append({'name':name,'start':start,'end':end,'path':out_path})
    result={'duration':duration,'segments':out_files}
    print(json.dumps(result))

if __name__=='__main__':
    if len(sys.argv)<3:
        print('usage: split_wav.py input.wav out_dir')
        sys.exit(2)
    split_wav(sys.argv[1],sys.argv[2])
